import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import TokenData from '../../domain/interfaces/token/token.interface';
import PresentedUser from '../../domain/interfaces/user/presented-user.interface';
import DataStoredInToken from '../../domain/interfaces/token/tokenId.interface';
import { TokenServiceError } from '../../domain/exceptions/token-service.error';
import User from '../../domain/interfaces/user/user.interface';

@injectable()
class TokenService {
    createTokens(data: User): TokenData {
        const expiresIn = 60 * 60 * 12; // 12 hours
        const refreshExpiresIn = 60 * 60 * 24 * 7; // 7 days
        const secret = process.env.JWT_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        if (!secret || !refreshSecret) {
            throw new TokenServiceError('token.invalidSecretsError');
        }

        const dataStoredInToken: PresentedUser = {
            id: data._id,
            name: data.name,
            surname: data.surname,
            nickname: data.nickname,
            isAdmin: data.isAdmin,
            teamId: data.teamId,
        };
        const dataStoredInRefresh: DataStoredInToken = { id: data._id };

        const accessToken = jwt.sign(dataStoredInToken, secret, { expiresIn });
        const refreshToken = jwt.sign(dataStoredInRefresh, refreshSecret, { expiresIn: refreshExpiresIn });

        return new TokenData(accessToken, refreshToken);
    }

    async hashToken(token: string): Promise<string> {
        return await bcrypt.hash(token, 10);
    }

    decodeToken(token: string): jwt.JwtPayload {
        const secretKey = process.env.JWT_REFRESH_SECRET;
        if (!secretKey) {
            throw new TokenServiceError('token.verificationFailedError');
        }
        try {
            return jwt.decode(token) as jwt.JwtPayload;
        } catch (_) {
            throw new TokenServiceError('token.jwtVerificationError');
        }
    }
}

export default TokenService;
