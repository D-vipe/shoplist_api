import bcrypt from 'bcrypt';
import UserRepository from '../../infrastructure/repositories/user.repository';
import User from '../../domain/interfaces/user/user.interface';
import { inject, injectable } from 'inversify';
import { DuplicateUserPhoneError } from '../../domain/exceptions/duplicate-user.error';

@injectable()
class CreateUserUseCase {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async execute(userData: User): Promise<User> {
    // Check if the user already exists
    const existingUser = await this.userRepository.findUserByPhone(userData.phone);
    if (existingUser) {
      throw new DuplicateUserPhoneError();
    }

    // !TODO add email check as soon there will be login via email

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
