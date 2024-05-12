import { NextFunction, Request, Response } from 'express';
import { NewUserRequestBody } from './userType.js';

export type ControllerType = (
  request: Request<{}, {}, NewUserRequestBody>,
  response: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>> | void>;
