import userModel from '../models/user.model';
import User from '../../domain/interfaces/user/user.interface';
import { UserRepositoryInterface } from '../../domain/irepositories/user.repository.interface';
import { injectable } from 'inversify';

@injectable()
class UserRepository implements UserRepositoryInterface {
  async createUser(user: User): Promise<User> {
    const newUser = new userModel(user);
    return await newUser.save();
  }

  async findUserById(id: string): Promise<User | null> {
    return await userModel.findById(id).exec();
  }

  async findUserByPhone(phone: string): Promise<User | null> {
    return await userModel.findOne({ phone: phone });
  }

  // Add other repository methods as needed
}

export default UserRepository;
