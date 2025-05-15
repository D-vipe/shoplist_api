import { inject, injectable } from 'inversify';
import TokenRepository from '../../infrastructure/repositories/token.repository';
import TokenService from '../services/token.service';
import { TokenServiceError } from '../../domain/exceptions/token-service.error';

@injectable()
class SaveRefreshTokenUseCase {
    constructor(
        @inject(TokenRepository) private tokenRepository: TokenRepository,
        @inject(TokenService) private tokenService: TokenService
    ) { }

    async execute(token: string): Promise<boolean> {
        // Use TokenService for shared logic
        const hashedToken = await this.tokenService.hashToken(token);
        const decoded = this.tokenService.decodeToken(token);

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

        const expiryDate: Date = new Date(decoded.exp * 1000);

        // Save the hashed token in the repository
        return await this.tokenRepository.saveToken({ userId: decoded.id, token: hashedToken, expiryDate });

    }
}

export default SaveRefreshTokenUseCase;
