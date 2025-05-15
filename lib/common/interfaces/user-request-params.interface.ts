import { Request } from 'express';
import User from '../../features/user/domain/interfaces/user/user.interface';



interface UserRequestParams extends Request {
  user: User;
}

export default UserRequestParams;
