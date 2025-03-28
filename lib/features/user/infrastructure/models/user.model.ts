import * as mongoose from 'mongoose';
import User from '../../domain/interfaces/user.interface';

const userSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    surname: {type: String, default: ''},
    nickname: {type: String, required: true, unique: true},
    email: {type: String, default: null},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    teamId: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
