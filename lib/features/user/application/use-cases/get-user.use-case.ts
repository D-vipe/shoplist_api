import { inject, injectable } from 'inversify';
import User from '../../domain/interfaces/user/user.interface';
import UserRepository from '../../infrastructure/repositories/user.repository';
import { UserNotFoundError } from '../../domain/exceptions/user-not-found.error';

@injectable()
class GetUserByIdUseCase {
    constructor(@inject(UserRepository) private userRepository: UserRepository) {}

    async execute(userId: string): Promise<User> {

      const user: User | null = await this.userRepository.findUserById(userId);
      if (user == null) {
        throw new UserNotFoundError();
      } else {
        return user;
      }
    }
  }

  export default GetUserByIdUseCase;
