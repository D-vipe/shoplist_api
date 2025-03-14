import userModel from '../models/user.model';
import User from '../../domain/interfaces/user.interface';

class UserRepository {
  async createUser(user: User): Promise<User> {
    const newUser = new userModel(user);
    return await newUser.save();
  }

  async findUserById(id: string): Promise<User | null> {
    return await userModel.findById(id).exec();
  }

  async findUserByPhone(phone: string): Promise<User | null> {
    return await userModel.findOne(  { phone: phone });
  }

  // Add other repository methods as needed
}

export default UserRepository;
