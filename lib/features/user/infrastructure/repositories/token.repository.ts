import logger from 'lib/logger';
import RefreshToken from '../../domain/interfaces/token/refresh-token.interface';
import { ITokenRepository } from '../../domain/irepositories/token.repository.interface';
import refreshTokenModel from '../models/refresh-token.model';
import { injectable } from 'inversify';

@injectable()
class TokenRepository implements ITokenRepository {

    async findToken(userId: string): Promise<RefreshToken | null> {
        return await refreshTokenModel.findOne({ userId }).exec();
    }

    async saveToken({ userId, token, expiryDate }: { userId: string; token: string; expiryDate: Date }): Promise<boolean> {
        try {
            const existingToken = await this.findToken(userId);

            if (existingToken) {
                await refreshTokenModel.updateOne({ userId }, { token });
            } else {
                await refreshTokenModel.create({ userId, token, expiryDate });
            }
            return true;
        } catch (err) {
            logger.error(err.message ?? 'Не удалось сохранить токен');
            throw new Error('token.saveError');
        }
    }

    async revokeToken({ userId }: { userId: string }): Promise<boolean> {
        try {
            const existingToken = await this.findToken(userId);

            if (!existingToken) {
                throw new Error('Не удалось найти необходимый токен');
            }

            if (existingToken.revoked) {
                throw new Error('Токен уже был отозван ранее');
            }

            await refreshTokenModel.updateOne({ userId }, { revoked: true });
            return true;
        } catch (err) {
            throw new Error(err.message ?? 'Не удалось отозвать токен');
        }
    }
}

export default TokenRepository;
