import * as mongoose from 'mongoose';
import User from '../../domain/interfaces/user/user.interface';

const userSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    surname: {type: String, default: ''},
    nickname: {type: String, required: true, unique: true},
    email: {type: String, default: null},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    teamId: {type: String, default: ''},
}, { timestamps: true });

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
