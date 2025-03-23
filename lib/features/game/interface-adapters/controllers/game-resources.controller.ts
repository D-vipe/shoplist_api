import * as express from 'express';
import { Request, Response } from 'express';
import authMiddleware from 'lib/common/middleware/auth.middleware';
import Roles from '../../core/enums/roles';

class GameResourcesController {
  public router = express.Router();
  private _baseUrl = '/resources';

  constructor() {
    this.intializeRoutes();
  }


  private intializeRoutes() {
    this.router.get(`${this._baseUrl}/getRoles`, authMiddleware, this.getRoles);
  }


  private async getRoles(req: Request, res: Response): Promise<void> {
      const roles: Array<string> = Object.values(Roles);
      res.status(200).json({ data: roles });
  }
}

export default GameResourcesController;
