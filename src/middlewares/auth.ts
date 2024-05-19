import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/utilityClass.js';
import { User, UserInterface } from '../models/user.js';

//Middleware to make sure only admin is allowed
export const adminOnly = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = request.user as UserInterface;

    if (user.role !== 'admin') {
      return next(new ErrorHandler('You are not admin.', 401));
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export const loggedInOnly = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (!request.isAuthenticated()) {
      return response.status(401).json({
        success: false,
        message: 'You are not logged in',
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
