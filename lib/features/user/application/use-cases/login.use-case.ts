import { inject, injectable } from "inversify";
import NotFoundException from "../../../../common/exceptions/not-found.exception";
import User from "../../domain/interfaces/user/user.interface";
import UserRepository from "../../infrastructure/repositories/user.repository";
import UserLoginDto from "../dto/user-login.dto";
import bcrypt from "bcrypt";
import WrongCredentialsException from "lib/common/exceptions/wrong-credentials.exception";

@injectable()
class LoginUserUseCase {
    constructor(@inject(UserRepository) private userRepository: UserRepository) {}

    async execute(loginData: UserLoginDto): Promise<User | null> {
        const user: User = await this.userRepository.findUserByPhone(loginData.phone);
        if (user == null) {
            throw new NotFoundException();
        } else {
            const isPasswordMatching = await bcrypt.compare(loginData.password, user.password);
            if (isPasswordMatching) {
                return user;
            } else {
                throw new WrongCredentialsException();
            }
        }
    }
}

export default LoginUserUseCase;
