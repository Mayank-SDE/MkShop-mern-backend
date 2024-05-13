import { ObjectId } from 'mongoose';

export type NewUserRequestBody = {
  name: string;
  email: string;
  image: string;
  role: string;
  gender: string;
  dob: Date;
  password: string;
};

export interface LoginUserRequestBody {
  email: string;
  password: string;
}

export type UpdateUserRequestBody = NewUserRequestBody;
export type UpdateUserParams = {
  userId: string;
};

export type DeleteUserParams = UpdateUserParams;

export type GetUserParams = UpdateUserParams;
