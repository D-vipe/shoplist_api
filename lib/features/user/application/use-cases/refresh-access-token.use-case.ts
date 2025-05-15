import { inject, injectable } from "inversify";
import TokenRepository from "../../infrastructure/repositories/token.repository";
import TokenService from "../services/token.service";
import { JwtPayload } from "jsonwebtoken";
import RefreshToken from "../../domain/interfaces/token/refresh-token.interface";

@injectable()
class RefreshAccessTokenUseCase {
    constructor(
        @inject(TokenRepository) private tokenRepository: TokenRepository,
        @inject(TokenService) private tokenService: TokenService
    ) { }

    async execute(token: string): Promise<boolean> {
        // Use TokenService for shared logic
        const hashedToken: string = await this.tokenService.hashToken(token);
        const decoded: JwtPayload = this.tokenService.verifyToken(token);

        // !WIP

        if (decoded.id) {
            const existingToken: RefreshToken | null = await this.tokenRepository.findToken(decoded.id);
        }



        if (decoded.exp) {
            const expiryDate: Date = new Date(decoded.exp * 1000);

            // Save the hashed token in the repository
            return await this.tokenRepository.saveToken({ userId: decoded.id, token: hashedToken, expiryDate });
        } else {
            throw new Error('Не удалось получить дату валидности токена');
        }
    }
}

export default RefreshAccessTokenUseCase;
