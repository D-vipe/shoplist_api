import RefreshToken from '../interfaces/token/refresh-token.interface';

export interface ITokenRepository {
    findToken(userId: string): Promise<RefreshToken | null>;

    saveToken({userId, token, expiryDate}: {userId: string, token: string, expiryDate: Date}): Promise<boolean>;

    revokeToken({ userId }: {userId: string}): Promise<boolean>
}
