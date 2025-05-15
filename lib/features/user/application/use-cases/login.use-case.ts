import { inject, injectable } from 'inversify';
import User from '../../domain/interfaces/user/user.interface';
import UserRepository from '../../infrastructure/repositories/user.repository';
import UserLoginDto from '../dto/user-login.dto';
import bcrypt from 'bcrypt';
import { UserNotFoundError } from '../../domain/exceptions/user-not-found.error';
import { LoginWrongCredentialsError } from '../../domain/exceptions/login-wrong-credentials.error';

@injectable()
class LoginUserUseCase {
    constructor(@inject(UserRepository) private userRepository: UserRepository) {}

    async execute(loginData: UserLoginDto): Promise<User | null> {
        const user: User = await this.userRepository.findUserByPhone(loginData.phone);
        if (user == null) {
            throw new UserNotFoundError();
        } else {
            const isPasswordMatching = await bcrypt.compare(loginData.password, user.password);
            if (isPasswordMatching) {
                return user;
            } else {
                throw new LoginWrongCredentialsError();
            }
        }
    }
}

export default LoginUserUseCase;
