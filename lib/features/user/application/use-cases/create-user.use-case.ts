import bcrypt from 'bcrypt';
import UserRepository from '../../infrastructure/repositories/user.repository';
import User from '../../domain/interfaces/user.interface';
import HttpException from 'lib/common/exceptions/HttpException';


class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userData: User): Promise<User> {
    // Check if the user already exists
    const existingUser = await this.userRepository.findUserByPhone(userData.phone);
    if (existingUser) {
      throw new HttpException(400, 'Email already in use');
    }

    // Hash the password
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Create the user
    const newUser = await this.userRepository.createUser(userData);
    newUser.password = undefined; // Remove the password from the response

    return newUser;
  }
}

export default new CreateUserUseCase(new UserRepository());
