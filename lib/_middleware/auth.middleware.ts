// import { NextFunction, Response } from 'express';
// import * as jwt from 'jsonwebtoken';
// import AuthenticationTokenMissingException from '../common/exceptions/AuthenticationTokenMissingException';
// import WrongAuthenticationTokenException from '../common/exceptions/WrongAuthenticationTokenException';
// import DataStoredInToken from '../interfaces-OLD/tokenId.interface';
// import RequestWithUser from '../common/interfaces/request-with-user.interface';
// import userModel from '../models/user.model';
// import mongoose from "mongoose";
// import WrongCredentialsException from '../common/exceptions/WrongCredentialsException';
// import { log } from 'winston';
// import logger from 'lib/logger';

// async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
//   const cookies = request.cookies;
//   if (cookies && cookies.Authorization) {
//     const secret = process.env.JWT_SECRET;
//     try {
//       const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
//       const id = verificationResponse._id;

//       if (!mongoose.Types.ObjectId.isValid(id)) {
//         next(new WrongCredentialsException());
//       } else {
//         const user = await userModel.findById(id);
//         if (user) {
//           request.user = user;
//           next();
//         } else {
//           logger.error('AuthMiddleware error: Wrong token');
//           next(new WrongAuthenticationTokenException());
//         }
//       }
//     } catch (error) {
//       logger.error('AuthMiddleware error', { error });
//       next(new WrongAuthenticationTokenException());
//     }
//   } else {
//     logger.error('AuthMiddleware error: Missing token');
//     next(new AuthenticationTokenMissingException());
//   }
// }

// export default authMiddleware;
