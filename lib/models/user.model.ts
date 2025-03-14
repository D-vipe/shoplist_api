import * as mongoose from 'mongoose';
import User from '../interfaces-OLD/user.interface';

const userSchema = new mongoose.Schema({
    name: {type: String},
    surname: {type: String},
    age: {type: Number},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    password: {type: String, required: true},
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
