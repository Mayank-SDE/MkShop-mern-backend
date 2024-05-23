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
  if (error.name === 'CastError') {
    error.message = 'Invalid id';
  }

  return response.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
