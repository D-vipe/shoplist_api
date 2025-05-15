import { inject, injectable } from 'inversify';
import TokenRepository from '../../infrastructure/repositories/token.repository';
import TokenService from '../services/token.service';
import { JwtPayload } from 'jsonwebtoken';
import RefreshToken from '../../domain/interfaces/token/refresh-token.interface';
import TokenData from '../../domain/interfaces/token/token.interface';
import { TokenServiceError } from '../../domain/exceptions/token-service.error';
import { NotFoundTokenError } from '../../domain/exceptions/not-found-token.error';
import { ExpiredTokenError } from '../../domain/exceptions/expired-token.error';
import UserRepository from '../../infrastructure/repositories/user.repository';
import User from '../../domain/interfaces/user/user.interface';
import { WrongAuthTokenError } from '../../domain/exceptions/wrong-auth-token.error';

@injectable()
class RefreshAccessTokenUseCase {
    constructor(
        @inject(UserRepository) private userRepository: UserRepository,
        @inject(TokenRepository) private tokenRepository: TokenRepository,
        @inject(TokenService) private tokenService: TokenService
    ) { }

    async execute(token: string): Promise<TokenData> {
        // Use TokenService for shared logic
        const decoded: JwtPayload = this.tokenService.decodeToken(token);

        // !Probably not necessary
        let errorMsg: string | null;

        if (!decoded.exp) {
            errorMsg = 'token.notFoundExpiryDateError';
        } else if (!decoded.id) {
            errorMsg = 'token.missingParams';
        }

        if (errorMsg != null && errorMsg.length > 0) {
            throw new TokenServiceError(errorMsg);
        }
        const existingToken: RefreshToken | null = await this.tokenRepository.findToken(decoded.id);
        const existingUser: User | null = await this.userRepository.findUserById(decoded.id);

        // If there is no record of such token or no user with relevant id, we should return Unauthorized status
        if (existingToken == null) {
            throw new NotFoundTokenError();
        }
        if (existingUser == null) {
            throw new WrongAuthTokenError();
        }

        const isTokenValid = await this.tokenService.compareToken(token, existingToken.token);
        if (!isTokenValid) {
            throw new WrongAuthTokenError();
        }

        const newExpiryDate: Date = new Date();
        const currentTime = Math.floor(newExpiryDate.getTime() / 1000); // Current time in seconds
        if (decoded.exp < currentTime) {
            throw new ExpiredTokenError();
        }

        // Create new tokens
        const tokenData: TokenData = this.tokenService.createTokens(existingUser);

        const hashedToken: string = await this.tokenService.hashToken(tokenData.refresh);

        // Save the hashed token in the repository
        await this.tokenRepository.saveToken({ userId: decoded.id, token: hashedToken, expiryDate: newExpiryDate });

        return tokenData;
    }
}

export default RefreshAccessTokenUseCase;
