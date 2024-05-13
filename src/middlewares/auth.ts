import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/utilityClass.js';
import { User } from '../models/user.js';

//Middleware to make sure only admin is allowed
export const adminOnly = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.query;

  if (!id) {
    return next(new ErrorHandler('You are not logged in.', 401));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  if (user.role !== 'admin') {
    return next(new ErrorHandler('You are not Authorized.', 401));
  }

  next();
};
