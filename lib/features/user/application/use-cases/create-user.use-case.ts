import bcrypt from 'bcrypt';
import UserRepository from '../../infrastructure/repositories/user.repository';
import User from '../../domain/interfaces/user/user.interface';
import HttpException from '../../../../common/exceptions/http-exception';
import { inject, injectable } from 'inversify';

@injectable()
class CreateUserUseCase {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async execute(userData: User): Promise<User> {
    // Check if the user already exists
    const existingUser = await this.userRepository.findUserByPhone(userData.phone);
    if (existingUser) {
      throw new HttpException(400, 'Пользователь с таким номером телефона уже существует');
    }

    // Hash the password
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Additionally clear provided phone (remove all [+,(,),-] symbols and odd spaces)
    if (userData.phone) {
      userData.phone = userData.phone.replace(/[+\-()\s]/g, '');
    }

    // Create the user
    const newUser = await this.userRepository.createUser(userData);

    return newUser;
  }
}

export default CreateUserUseCase;
