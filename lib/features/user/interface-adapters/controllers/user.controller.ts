import * as express from 'express';
import { Request, Response } from 'express';
import CreateUserUseCase from '../../application/use-cases/create-user.use-case';
import GetUserByIdUseCase from '../../application/use-cases/get-user.use-case';
import validationMiddleware from '../../../../common/middleware/validation.middleware';
import UserDto from '../../application/dto/user.dto';
import User from '../../domain/interfaces/user.interface';
import userPresenter from '../presenters/user.presenter';
import UserLoginDto from '../../application/dto/user-login.dto';
import loginUseCase from '../../application/use-cases/login.use-case';
import TokenData from '../../domain/interfaces/token.interface';
import createTokenUseCase from '../../application/use-cases/create-token.use-case';
import authMiddleware from 'lib/common/middleware/auth.middleware';
import AppResponse from 'lib/common/interfaces/app-response.interface';

class UserController {
  public router = express.Router();
  private _baseUrl: string = '/users';

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(`${this._baseUrl}/login`, validationMiddleware(UserLoginDto), this.login);
    this.router.put(`${this._baseUrl}`, validationMiddleware(UserDto), this.createUser);
    // this.router.post(`${this.path}/logout`, this.loggingOut);
    this.router.get(`${this._baseUrl}/getById`, authMiddleware, this.getById);
    // this.router.patch(`${this.path}/update`, authMiddleware, validationMiddleware(UserDto, true), this.update);
  }


  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: User = await CreateUserUseCase.execute(req.body);

      const response: AppResponse = {
        success: true,
        data: userPresenter.presentUser(user),
        error: null
      };

      res.status(201).json(response);
    } catch (error) {

      const response: AppResponse = { success: false, data: null, error: error.message };

      res.status(error.code ?? 400).json(response);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const user: User = await GetUserByIdUseCase.execute(req.params.id);

      const response: AppResponse = {
        success: true,
        data: userPresenter.presentUser(user),
        error: null
      };

      res.status(200).json(response);


    } catch (error) {
      console.error(`${error.code} ?? 400`);

      const response: AppResponse = {
        success: false,
        data: null,
        error: error.message
      };

      res.status(error.code ?? 400).json(response);
    }
  }

  private async login(req: Request, res: Response, next: express.NextFunction): Promise<void> {

    try {
      const logInData: UserLoginDto = req.body;
      const user: User = await loginUseCase.execute(logInData);

      const tokenData: TokenData = createTokenUseCase.execute(user);

      const response: AppResponse = {
        success: true,
        data: { ...tokenData },
        error: null
      };

      res.status(200).json(response);
    } catch (error) {

      next(error);
    }
  }

}

export default UserController;
