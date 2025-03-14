import * as express from 'express';
import { Request, Response } from 'express';
import CreateUserUseCase from '../../application/use-cases/create-user.use-case';
import authMiddleware from 'lib/middleware/auth.middleware';
import GetUserByIdUseCase from '../../application/use-cases/get-user.use-case';
import validationMiddleware from 'lib/middleware/validation.middleware';
import UserDto from '../../application/dto/user.dto';
import User from '../../domain/interfaces/user.interface';
import userPresenter from '../presenters/user.presenter';
import UserLoginDto from '../../application/dto/user-login.dto';
import loginUseCase from '../../application/use-cases/login.use-case';
import TokenData from '../../domain/interfaces/token.interface';
import createTokenUseCase from '../../application/use-cases/create-token.use-case';

class UserController {
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.put('/users', validationMiddleware(UserDto), this.createUser);
    this.router.post(`/users/login`, validationMiddleware(UserLoginDto), this.login);
    // this.router.post(`${this.path}/logout`, this.loggingOut);
    this.router.get(`/users/getById`, authMiddleware, this.getById);
    // this.router.patch(`${this.path}/update`, authMiddleware, validationMiddleware(UserDto, true), this.update);
  }


  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await CreateUserUseCase.execute(req.body);
      res.status(201).json({ data: user });
    } catch (error) {
      res.status(error.code ?? 400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const user: User = await GetUserByIdUseCase.execute(req.params.id);

      res.status(200).json({ data: userPresenter.presentUser(user) });


    } catch (error) {
      console.error(`${error.code} ?? 400`);
      res.status(error.code ?? 400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const user: User = await loginUseCase.execute(req.body.data);

      const tokenData: TokenData = createTokenUseCase.execute(user);

      // res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
      res.status(200).json({ success: true, data: { user: user, token: tokenData } });

    } catch (error) {
      console.error(`${error.code} ?? 400`);
      res.status(error.code ?? 400).json({ error: error.message });
    }
  }



}

export default UserController;


// import * as express from 'express';
// import User from '../interfaces-OLD/user.interface';
// import userModel from '../../infrastructure/models/user.model';
// import HttpException from '../common/exceptions/HttpException';
// import WrongCredentialsException from '../common/exceptions/WrongCredentialsException';
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validationMiddleware from '../middleware/validation.middleware';
// import authMiddleware from '../middleware/auth.middleware';
// import UserDto from '../data_transfer-OLD/user.dto';
// import UserIdDto from '../data_transfer-OLD/userId.dto';
// import UserLoginDto from '../data_transfer-OLD/userLogin.dto';
// import TokenData from '../interfaces-OLD/token.interface';
// import DataStoredInToken from '../interfaces-OLD/tokenId.interface';
// import RequestWithUser from '../interfaces-OLD/requestWithUser.interface';

// class UserController {
//   public path = '/users';
//   public router = express.Router();
//   private model = userModel;

//   constructor() {
//     this.intializeRoutes();
//   }

//   public intializeRoutes() {
//     this.router.put(this.path, validationMiddleware(UserDto), this.registration);
//     this.router.post(`${this.path}/login`, validationMiddleware(UserLoginDto), this.login);
//     this.router.post(`${this.path}/logout`, this.loggingOut);
//     this.router.post(`${this.path}/getById`, authMiddleware, validationMiddleware(UserIdDto), this.getById);
//     this.router.patch(`${this.path}/update`, authMiddleware, validationMiddleware(UserDto, true), this.update);
//   }

//   private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     const postData: UserDto = req.body.data;

//     if (await this.model.findOne({ email: postData.email })) {
//       next(new HttpException(400, 'Данный email уже используется'));
//     } else {
//       if (postData.password != '' && postData.password != null && postData.password != undefined) {
//         postData.password = await bcrypt.hash(postData.password, 10);
//       }
//       const createdItem = new this.model(postData);
//       createdItem.save()
//         .then((savedData) => {
//           if (savedData) {
//             savedData.password = undefined;
//             res.status(200).json({ success: true, data: savedData });
//           } else {
//             next(new HttpException(401, 'Не удалось создать пользователя'));
//           }
//         });
//     }
//   };

//   private login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     const logInData: UserLoginDto = req.body.data;
//     const user = await this.model.findOne({ email: logInData.email });
//     if (user) {
//       const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
//       if (isPasswordMatching) {
//         user.password = undefined;
//         const tokenData = this.createToken(user);
//         res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
//         res.status(200).json({ success: true, data: user });
//       } else {
//         next(new WrongCredentialsException());
//       }
//     }
//   };

//   private getById = async (req: RequestWithUser, res: express.Response) => {
//     req.user.password = undefined;
//     res.status(200).json({ success: true, data: req.user });
//   };

//   private update = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
//     const postData: User = req.body.data;

//     const fieldsToUpdate = {
//       name: postData.name ?? req.user.name,
//       surname: postData.surname ?? req.user.surname,
//       age: postData.age ?? req.user.age,
//       email: postData.email ?? req.user.email,
//       phone: postData.phone ?? req.user.phone,
//       password: (postData.password ? await bcrypt.hash(postData.password, 10) : req.user.password),
//     };

//     const updatedUser = await this.model.findOneAndUpdate(
//       { _id: req.user._id },
//       fieldsToUpdate,
//       { new: true }
//     );

//     if (updatedUser) {
//       updatedUser.password = undefined;
//       res.status(200).json({status: true, data: updatedUser});
//     } else {
//       next(new HttpException(400, 'Произошла ошибка при обновлении пользователя'));
//     }

//   };

//   private createToken(user: User): TokenData {
//     const expiresIn = 60 * 60 * 12; // 12 hours
//     const secret = process.env.JWT_SECRET;
//     const dataStoredInToken: DataStoredInToken = {
//       _id: user._id,
//     };
//     return {
//       expiresIn,
//       token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
//     };
//   }

//   private createCookie(tokenData: TokenData) {
//     return `Authorization=${tokenData.token}; path=/; HttpOnly; Max-Age=${tokenData.expiresIn}`;
//   }

//   private loggingOut = async (request: express.Request, response: express.Response) => {
//     response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
//     response.send(200);
//   };

// }

// export default UserController;
