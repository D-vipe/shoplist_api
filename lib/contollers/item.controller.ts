import * as express from 'express';
import CreateItemDto from '../data_transfer/createItem.dto';
import UpdateItemDto from '../data_transfer/updateItem.dto';
import authMiddleware from '../middleware/auth.middleware';
import mongoose from "mongoose";
import validationMiddleware from '../middleware/validation.middleware';
import itemModel from '../models/item.model';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import NotFoundException from '../exceptions/NotFoundException';
import HttpException from '../exceptions/HttpException';
import GetItemsByIdDto from '../data_transfer/getItemsById.dto';
import GetItemsByListIdDto from '../data_transfer/getItemsByListId.dto';
import listModel from '../models/list.model';
import DelItemDto from 'lib/data_transfer/delItem.dto';

class ItemController {
  public path = '/item';
  public router = express.Router();
  private model = itemModel;
  private listModel = listModel;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, authMiddleware, validationMiddleware(GetItemsByListIdDto), this.getList);
    this.router.post(`${this.path}/getById`, authMiddleware, validationMiddleware(GetItemsByIdDto),this.getById);
    this.router.put(this.path, authMiddleware, validationMiddleware(CreateItemDto, true), this.create);
    this.router.patch(`${this.path}/update`, authMiddleware, validationMiddleware(UpdateItemDto, true), this.update);
    this.router.delete(this.path, authMiddleware, validationMiddleware(GetItemsByIdDto), this.delete);
  }

  private getList = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const postData: GetItemsByListIdDto = req.body.data;

    const items = await this.model.find({
      list_id: postData.list_id,
    }).exec();
    if (items) {
      res.status(200).json({success: true, data: items});
    } else {
      next(new HttpException(400, 'Произошла ошибка при получении данных'));
    }
  };

  private getById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const postData: GetItemsByIdDto = req.body.data;

    if (!mongoose.Types.ObjectId.isValid(postData._id)) {
      next(new WrongCredentialsException());
    } else {
      const item = await this.model.findById(postData._id);

      if (item) {
        res.status(200).json({success: true, data: item});
      } else {
        next(new NotFoundException());
      }
    }
  };

  private create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const postData: CreateItemDto = req.body.data;

    const createdItem = new this.model(postData);
    createdItem.save()
      .then((savedData) => {
        // update list record
        if (this.updateListRecord(savedData, 'create')) {
          res.status(200).json({success: true, data: savedData});
        } else {
          next(new HttpException(400, 'Что-то пошло не так'));
        }
      });
  };

  private update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const postData: UpdateItemDto = req.body.data;

    if (!mongoose.Types.ObjectId.isValid(postData._id)) {
      next(new WrongCredentialsException());
    } else {
      const existingItem = await this.model.findById(postData._id);

      if (existingItem) {
        const fieldsToUpdate = {
          name: postData.name ?? existingItem.name,
          amount: postData.amount ?? existingItem.amount,
          price: postData.price ?? existingItem.price,
          checked: postData.checked ?? existingItem.checked,
        };

        const updatedItem = await this.model.findOneAndUpdate(
          { _id: postData._id },
          fieldsToUpdate,
          { new: true }
        );

        if (updatedItem) {
          res.status(200).json({status: true, data: updatedItem});
        } else {
          next(new HttpException(400, 'Произошла ошибка при обновлении данных'));
        }
      } else {
        next(new NotFoundException());
      }
    }
  };

  private delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const postItem: DelItemDto = req.body.data;

    if (!mongoose.Types.ObjectId.isValid(postItem._id)) {
      next(new WrongCredentialsException());
    } else {
      const deleted = await this.model.deleteOne({_id: postItem._id});

      if (deleted.deletedCount && deleted.deletedCount > 0) {
        // Need to delete relevant id from list items
        this.updateListRecord({"_id": postItem._id, "list_id": postItem.list_id}, 'delete');
        res.status(200).json({success: true});
      } else {
        next(new HttpException(400, 'Произошла ошибка при удалении данных'));
      }
    }
  };

  private updateListRecord = async (data, action: string) => {
    const existingList = await this.listModel.findById(data.list_id).exec();
    console.log(existingList);
    let idx;
    if (existingList) {
      switch(action) {
        case 'create':
          existingList.items.push(data._id);
          console.log({'existing_items': existingList.items});
          break;
        case 'delete':
          idx = existingList.items.indexOf(data._id);
          if (idx > -1) {
            existingList.items.splice(idx, 1);
          }
          break;
      }

      const updatedList = await this.listModel.findOneAndUpdate(
        { _id: data.list_id },
        {items: existingList.items},
        { new: true }
      );

      if (updatedList) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
}

export default ItemController;
