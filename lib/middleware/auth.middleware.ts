import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../common/exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../common/exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../interfaces-OLD/tokenId.interface';
import RequestWithUser from '../interfaces-OLD/requestWithUser.interface';
import userModel from '../models/user.model';
import mongoose from "mongoose";
import WrongCredentialsException from '../common/exceptions/WrongCredentialsException';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      const id = verificationResponse._id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        next(new WrongCredentialsException());
      } else {
        const user = await userModel.findById(id);
        if (user) {
          request.user = user;
          next();
        } else {
          next(new WrongAuthenticationTokenException());
        }
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
