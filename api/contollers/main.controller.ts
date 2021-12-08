import * as express from 'express';
import List from '../interfaces/list.interface';
import listModel from '../models/list.model';
// import validationMiddleware from '../middleware/validation.middleware';

class MainController {
  public path = '/list';
  public router = express.Router();
  private model = listModel;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    // this.router.post(this.path, this.list);
    this.router.put(this.path, this.addList);
  }

//   list = (request: express.Request, response: express.Response) => {
    // const post: Post = request.body;
    // // this.posts.push(post);
    // response.send(post);
//   };

  addList = (req: express.Request, res: express.Response) => {
    const postList: List = req.body.data;
    const createdList = new this.model(postList);
    createdList.save()
      .then((savedData) => {
        res.status(200).json({success: true, data: savedData});
      });
  };

}

export default MainController;
