import * as mongoose from 'mongoose';
import RefreshToken from '../../domain/interfaces/token/refresh-token.interface';

const refreshTokenSchema = new mongoose.Schema({
    token: {type: String, default: null},
    userId: {type: String, required: true, unique: true},
    clientId: {type: String, default: null}, // The ID of the client application that requested the token
    expiryDate: {type: Date, required: true},
    revoked: {type: Boolean, default: false},
}, { timestamps: true });

const refreshTokenModel = mongoose.model<RefreshToken & mongoose.Document>('RefreshToken', refreshTokenSchema);

export default refreshTokenModel;
