/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import HttpException from '../common/exceptions/HttpException';

function errorMiddleware(error: HttpException, _request: Request, response: Response, _next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Что-то пошло не так';
  response
    .status(status)
    .send({
      status,
      message,
    });
}

export default errorMiddleware;
