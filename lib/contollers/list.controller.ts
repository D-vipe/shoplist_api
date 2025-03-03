import * as express from 'express';
import CreateListDto from '../data_transfer/createList.dto';
import UpdateListDto from '../data_transfer/updateList.dto';
import authMiddleware from '../middleware/auth.middleware';
import mongoose from "mongoose";
import validationMiddleware from '../middleware/validation.middleware';
import listModel from '../models/list.model';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import NotFoundException from '../exceptions/NotFoundException';
import HttpException from '../exceptions/HttpException';
import GetListByIdDto from '../data_transfer/getListById.dto';
import itemModel from '../models/item.model';

class ListController {
  public path = '/list';
  public router = express.Router();
  private model = listModel;
  private itemModel = itemModel;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    // this.router.post(this.path, this.list);
    this.router.post(this.path, authMiddleware, this.getList);
    this.router.post(`${this.path}/getById`, authMiddleware, validationMiddleware(GetListByIdDto),this.getById);
    this.router.put(this.path, authMiddleware, validationMiddleware(CreateListDto, true), this.create);
    this.router.patch(`${this.path}/update`, authMiddleware, validationMiddleware(UpdateListDto, true), this.update);
    this.router.delete(this.path, authMiddleware, validationMiddleware(GetListByIdDto), this.delete);
  }

  private getList = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const lists = await this.model.find({
      user_id: req.user._id,
    }).exec();
    if (lists) {
      res.status(200).json({success: true, data: lists});
    } else {
      next(new HttpException(400, 'Произошла ошибка при получении данных'));
    }
  };

  private getById = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const postList: GetListByIdDto = req.body.data;

    if (!mongoose.Types.ObjectId.isValid(postList._id)) {
      next(new WrongCredentialsException());
    } else {
      const list = await this.model.findById(postList._id);

      if (list) {
        res.status(200).json({success: true, data: list});
      } else {
        next(new NotFoundException());
      }
    }
  };

  private create = async (req: RequestWithUser, res: express.Response) => {
    const postList: CreateListDto = req.body.data;
    postList.user_id = req.user._id;

    const createdList = new this.model(postList);
    createdList.save()
      .then((savedData) => {
        res.status(200).json({success: true, data: savedData});
      });
  };

  private update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const postList: UpdateListDto = req.body.data;

    if (!mongoose.Types.ObjectId.isValid(postList._id)) {
      next(new WrongCredentialsException());
    } else {
      const existingList = await this.model.findById(postList._id);

      // объединим массивы продуктов и связанных пользователей, если необходимо
      let updateAssigned = existingList.assigned_id,
          updateItems = existingList.items;
      if (postList.assigned_id && postList.assigned_id.length > 0) {
        updateAssigned = existingList.assigned_id.concat(postList.assigned_id);
      }

      if (postList.items && postList.items.length > 0) {
        updateItems = existingList.items.concat(postList.items);
      }

      if (existingList) {
        const fieldsToUpdate = {
          name: postList.name ?? existingList.name,
          items: updateItems,
          assigned_id: updateAssigned,
          finished: postList.finished ?? existingList.finished,
        };

        const updatedList = await this.model.findOneAndUpdate(
          { _id: postList._id },
          fieldsToUpdate,
          { new: true }
        );

        if (updatedList) {
          res.status(200).json({status: true, data: updatedList});
        } else {
          next(new HttpException(400, 'Произошла ошибка при обновлении данных'));
        }
      } else {
        next(new NotFoundException());
      }
    }
  };

  private delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const postList: GetListByIdDto = req.body.data;

    if (!mongoose.Types.ObjectId.isValid(postList._id)) {
      next(new WrongCredentialsException());
    } else {
      const listDetails = await this.model.findById(postList._id);
      const deleted = await this.model.deleteOne({_id: postList._id});

      if (deleted.deletedCount && deleted.deletedCount > 0) {
        if (listDetails.items.length > 0) {
          const deletedItems = await this.itemModel.deleteMany({_id: {
            $in: listDetails.items
          }});

          if (deletedItems.deletedCount && deletedItems.deletedCount > 0) {
            res.status(200).json({success: true});
          } else {
            res.status(200).json({success: true, message: 'Список удален, элементы списка не удалось удалить'});
          }
        } else {
          res.status(200).json({success: true});
        }
      } else {
        next(new HttpException(400, 'Произошла ошибка при удалении данных'));
      }
    }
  };

}

export default ListController;
