import { injectable, inject } from 'inversify';
import bcrypt from 'bcrypt';
import TokenRepository from '../../infrastructure/repositories/token.repository';
import jwt from 'jsonwebtoken';

@injectable()
class SaveRefreshTokenUseCase {
    constructor(@inject(TokenRepository) private tokenRepository: TokenRepository) { }

    async execute(token: string): Promise<boolean> {
        // Hash the token
        const hashedToken = await bcrypt.hash(token, 10);
        const secretKey = process.env.JWT_REFRESH_SECRET;
        const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

        if (decoded.exp) {
            const expiryDate: Date = new Date(decoded.exp * 1000);

            // Save the hashed token in the repository
            return await this.tokenRepository.saveToken({ userId: decoded.id, token: hashedToken, expiryDate  });
        } else {
            throw new Error('Не удалось получить дату валидности токена');
        }
    }
}

export default SaveRefreshTokenUseCase;
