import * as express from 'express';
import Post from '../interfaces/post.interface';

class MainController {
  public path = '/list';
  public router = express.Router();

  private posts: Post[] = [
    {
      author: 'Marcin',
      content: 'Dolor sit amet',
      title: 'Lorem Ipsum',
    }
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.list);
  }

  list = (request: express.Request, response: express.Response) => {
    const post: Post = request.body;
    // this.posts.push(post);
    response.send(post);
  };
}

export default MainController;
