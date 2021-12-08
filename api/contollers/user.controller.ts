import * as express from 'express';
import User from '../interfaces/user.interface';
import userModel from '../models/user.model';
import HttpException from '../exceptions/HttpException';
import mongoose from "mongoose";
import md5 from "md5";
import validationMiddleware from '../middleware/validation.middleware';
import UserDto from '../data_transfer/user.dto';
import UserIdDto from '../data_transfer/userId.dto';

class UserController {
  public path = '/users';
  public router = express.Router();
  private model = userModel;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(`${this.path}/getById`, validationMiddleware(UserIdDto), this.getById);
    this.router.put(this.path, validationMiddleware(UserDto), this.create);
  }

  create = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const postData: User = req.body.data;
    if (postData.password != '' && postData.password != null && postData.password != undefined) {
      postData.password = md5(md5(postData.password));
    }
    const createdItem = new this.model(postData);
    createdItem.save()
      .then((savedData) => {
        if (savedData) {
          res.status(200).json({ success: true, data: savedData });
        } else {
          next(new HttpException(401, 'Не удалось создать пользователя'));
        }
      });
  };

  getById = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const postData: User = req.body.data;

    const objectId = mongoose.Types.ObjectId.isValid(postData._id);
    if(!objectId) {
      next(new HttpException(400, 'Что-то пошло не так'));
    }

    this.model.findById(postData._id)
      .then((data) => {
        if (data) {
          res.status(200).json({ success: true, data: data });
        } else {
          next(new HttpException(404, 'Пользователь не найден'));
        }
      });
  };

}

export default UserController;
