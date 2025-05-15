import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import TokenData from '../../domain/interfaces/token/token.interface';
import PresentedUser from '../../domain/interfaces/user/presented-user.interface';
import DataStoredInToken from '../../domain/interfaces/token/tokenId.interface';

@injectable()
class TokenService {
    createTokens(data: PresentedUser): TokenData {
        const expiresIn = 60 * 60 * 12; // 12 hours
        const refreshExpiresIn = 60 * 60 * 24 * 7; // 7 days
        const secret = process.env.JWT_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        if (!secret || !refreshSecret) {
            throw new Error('Не удалось найти необходимые параметры для создания токенов');
        }

        const dataStoredInToken: PresentedUser = { ...data };
        const dataStoredInRefresh: DataStoredInToken = { id: data.id };

        const accessToken = jwt.sign(dataStoredInToken, secret, { expiresIn });
        const refreshToken = jwt.sign(dataStoredInRefresh, refreshSecret, { expiresIn: refreshExpiresIn });

        return new TokenData(accessToken, refreshToken);
    }

    async hashToken(token: string): Promise<string> {
        return await bcrypt.hash(token, 10);
    }

    verifyToken(token: string): jwt.JwtPayload {
        const secretKey = process.env.JWT_REFRESH_SECRET;
        if (!secretKey) {
            throw new Error('Не удалось найти необходимые параметры для верификации токена');
        }
        return jwt.verify(token, secretKey) as jwt.JwtPayload;
    }
}

export default TokenService;
