import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/utilityClass.js';

export const errorMiddleware = (
  error: ErrorHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  error.message ||= 'Internal server error.';

  error.statusCode ||= 500;

  return response.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
/*
export const TryCatch = (controllerFunction: ControllerType) => {
  return (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(controllerFunction(request, response, next)).catch(
      (error) => {
        next(error);
      }
    );
  };
};
*/
