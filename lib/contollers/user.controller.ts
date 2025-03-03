import * as express from 'express';
import User from '../interfaces/user.interface';
import userModel from '../models/user.model';
import HttpException from '../exceptions/HttpException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import UserDto from '../data_transfer/user.dto';
import UserIdDto from '../data_transfer/userId.dto';
import UserLoginDto from '../data_transfer/userLogin.dto';
import TokenData from '../interfaces/token.interface';
import DataStoredInToken from '../interfaces/tokenId.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';

class UserController {
  public path = '/users';
  public router = express.Router();
  private model = userModel;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.put(this.path, validationMiddleware(UserDto), this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(UserLoginDto), this.login);
    this.router.post(`${this.path}/logout`, this.loggingOut);
    this.router.post(`${this.path}/getById`, authMiddleware, validationMiddleware(UserIdDto), this.getById);
    this.router.patch(`${this.path}/update`, authMiddleware, validationMiddleware(UserDto, true), this.update);
  }

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const postData: UserDto = req.body.data;

    if (await this.model.findOne({ email: postData.email })) {
      next(new HttpException(400, 'Данный email уже используется'));
    } else {
      if (postData.password != '' && postData.password != null && postData.password != undefined) {
        postData.password = await bcrypt.hash(postData.password, 10);
      }
      const createdItem = new this.model(postData);
      createdItem.save()
        .then((savedData) => {
          if (savedData) {
            savedData.password = undefined;
            res.status(200).json({ success: true, data: savedData });
          } else {
            next(new HttpException(401, 'Не удалось создать пользователя'));
          }
        });
    }
  };

  private login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const logInData: UserLoginDto = req.body.data;
    const user = await this.model.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if (isPasswordMatching) {
        user.password = undefined;
        const tokenData = this.createToken(user);
        res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        res.status(200).json({ success: true, data: user });
      } else {
        next(new WrongCredentialsException());
      }
    }
  };

  private getById = async (req: RequestWithUser, res: express.Response) => {
    req.user.password = undefined;
    res.status(200).json({ success: true, data: req.user });
  };

  private update = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const postData: User = req.body.data;

    const fieldsToUpdate = {
      name: postData.name ?? req.user.name,
      surname: postData.surname ?? req.user.surname,
      age: postData.age ?? req.user.age,
      email: postData.email ?? req.user.email,
      phone: postData.phone ?? req.user.phone,
      password: (postData.password ? await bcrypt.hash(postData.password, 10) : req.user.password),
    };

    const updatedUser = await this.model.findOneAndUpdate(
      { _id: req.user._id },
      fieldsToUpdate,
      { new: true }
    );

    if (updatedUser) {
      updatedUser.password = undefined;
      res.status(200).json({status: true, data: updatedUser});
    } else {
      next(new HttpException(400, 'Произошла ошибка при обновлении пользователя'));
    }

  };

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60 * 12; // 12 hours
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; path=/; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private loggingOut = async (request: express.Request, response: express.Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  };

}

export default UserController;
