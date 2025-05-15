import { inject, injectable } from "inversify";
import NotFoundException from "../../../../common/exceptions/not-found.exception";
import User from "../../domain/interfaces/user/user.interface";
import UserRepository from "../../infrastructure/repositories/user.repository";

@injectable()
class GetUserByIdUseCase {
    constructor(@inject(UserRepository) private userRepository: UserRepository) {}

    async execute(userId: string): Promise<User> {

      const user: User | null = await this.userRepository.findUserById(userId);
      if (user == null) {
        throw new NotFoundException();
      } else {
        return user;
      }
    }
  }

  export default GetUserByIdUseCase;
