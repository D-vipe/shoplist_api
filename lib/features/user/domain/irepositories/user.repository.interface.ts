import User from "../interfaces/user/user.interface";

export interface UserRepositoryInterface {
    findUserById(id: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    findUserByPhone(phone: string): Promise<User | null>;
    // Add other methods as needed
}
