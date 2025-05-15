import 'reflect-metadata';
import { Container } from 'inversify';
import TokenRepository from './features/user/infrastructure/repositories/token.repository';
import SaveRefreshTokenUseCase from './features/user/application/use-cases/save-refresh-token.use-case';
import UserController from './features/user/interface-adapters/controllers/user.controller';
import CreateUserUseCase from './features/user/application/use-cases/create-user.use-case';
import GetUserByIdUseCase from './features/user/application/use-cases/get-user.use-case';
import LoginUserUseCase from './features/user/application/use-cases/login.use-case';
import TokenService from './features/user/application/services/token.service';
import UserRepository from './features/user/infrastructure/repositories/user.repository';

const container = new Container();

// Bind classes to the container
container.bind(TokenRepository).toSelf();
container.bind(UserRepository).toSelf();

// Bind use cases
container.bind(LoginUserUseCase).toSelf();
container.bind(CreateUserUseCase).toSelf();
container.bind(GetUserByIdUseCase).toSelf();
container.bind(SaveRefreshTokenUseCase).toSelf();

// Bind services to the container
container.bind(TokenService).toSelf();

// Bind UserController with dependencies
container.bind(UserController).toDynamicValue(() => {
  return new UserController(
    container.get(LoginUserUseCase),
    container.get(SaveRefreshTokenUseCase),
    container.get(CreateUserUseCase),
    container.get(GetUserByIdUseCase),
    container.get(TokenService),
  );
});

export default container;
