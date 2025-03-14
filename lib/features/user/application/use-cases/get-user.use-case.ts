import NotFoundException from "lib/common/exceptions/NotFoundException";
import User from "../../domain/interfaces/user.interface";
import UserRepository from "../../infrastructure/repositories/user.repository";

class GetUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(userId: string): Promise<User> {

      const user: User | null = await this.userRepository.findUserById(userId);
      if (user == null) {
        throw new NotFoundException();
      } else {
        return user;
      }
    }
  }

  export default new GetUserByIdUseCase(new UserRepository());
