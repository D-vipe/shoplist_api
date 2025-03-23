import { Request } from 'express';
import User from '../../features/user/domain/interfaces/user.interface';



interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
