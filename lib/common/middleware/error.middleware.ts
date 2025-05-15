/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http-exception';
import AppResponse from 'lib/common/interfaces/app-response.interface';
import logger from 'lib/logger';

function errorMiddleware(error: HttpException, _request: Request, res: Response, _next: NextFunction) {
  const status = error.status || 500;

  const message = _request.t(error.message) || 'Что-то пошло не так';

  const response: AppResponse = {
    success: false,
    data: null,
    error: message,
  };
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${status} - ${message}- ${error.stack}`);
  }
  logger.error(`[ERROR] ${status} - ${message} - ${error.stack}`);
  res.status(status).json(response);
}

export default errorMiddleware;
