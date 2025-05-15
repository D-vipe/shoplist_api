import * as express from 'express';
import { Request, Response } from 'express';
import CreateUserUseCase from '../../application/use-cases/create-user.use-case';
import GetUserByIdUseCase from '../../application/use-cases/get-user.use-case';
import validationMiddleware from '../../../../common/middleware/validation.middleware';
import UserDto from '../../application/dto/user.dto';
import userPresenter from '../presenters/user.presenter';
import UserLoginDto from '../../application/dto/user-login.dto';
import authMiddleware from 'lib/common/middleware/auth.middleware';
import AppResponse from 'lib/common/interfaces/app-response.interface';
import User from '../../domain/interfaces/user/user.interface';
import TokenData from '../../domain/interfaces/token/token.interface';
import RefreshTokenDto from '../../application/dto/refresh-token.dto';
import SaveRefreshTokenUseCase from '../../application/use-cases/save-refresh-token.use-case';
import LoginUserUseCase from '../../application/use-cases/login.use-case';
import TokenService from '../../application/services/token.service';

class UserController {
  public router = express.Router();
  private _baseUrl: string = '/users';

  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly saveRefreshTokenUseCase: SaveRefreshTokenUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly tokenService: TokenService,
  ) {
    // Bind methods to the class instance
    this.login = this.login.bind(this);
    this.createUser = this.createUser.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.getById = this.getById.bind(this);

    this.intializeRoutes();
  }


  public intializeRoutes() {
    this.router.post(`${this._baseUrl}/login`, validationMiddleware(UserLoginDto), this.login);

    this.router.put(`${this._baseUrl}`, validationMiddleware(UserDto), this.createUser);

    this.router.post(`${this._baseUrl}/refresh_token`, validationMiddleware(RefreshTokenDto), this.refreshToken);

    this.router.get(`${this._baseUrl}/getById`, authMiddleware, this.getById);
  }


  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: User = await this.createUserUseCase.execute(req.body);

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
      const user: User = await this.getUserByIdUseCase.execute(req.params.id);

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
      const user: User = await this.loginUserUseCase.execute(logInData);

      const tokenData: TokenData = this.tokenService.createTokens(userPresenter.presentUser(user));

      // Save generated refresh token
      await this.saveRefreshTokenUseCase.execute(tokenData.refresh);

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

  private async refreshToken(req: Request, res: Response, next: express.NextFunction): Promise<void> {
    try {
      // const refreshResult: TokenData = await this.re
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

}

export default UserController;
