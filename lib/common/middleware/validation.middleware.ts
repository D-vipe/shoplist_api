/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import HttpException from '../exceptions/http-exception';

function validationMiddleware<T>(type: any, skipMissingProperties = false): express.RequestHandler {
  return (req, _, next) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');

          next(new HttpException(400, message));
        } else {
          next();
        }
      });
  };
}

export default validationMiddleware;
