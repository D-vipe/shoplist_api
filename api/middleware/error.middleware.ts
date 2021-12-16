/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import logger from './logger.middleware';

function errorMiddleware(error: HttpException, _request: Request, response: Response, _next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Что-то пошло не так';
  if (status === 500) {
    logger.fatal(message);
  } else if (status >= 400 && status < 500) {
    if (status == 404) {
      logger.warn(message);
    } else {
      logger.error(message);
    }
  } else {
    logger.info(message);
  }
  response
    .status(status)
    .send({
      status,
      message,
    });
}

export default errorMiddleware;
