import { ObjectId } from 'mongoose';

export interface NewUserRequestBody {
  username: string;
  email: string;
  image: string;
  role: string;
  gender: string;
  dob: Date;
  password: string;
}

export interface LoginUserRequestBody {
  username: string;
  password: string;
}

export interface UpdateUserRequestBody extends NewUserRequestBody {
  _id: string;
}
export type UpdateUserParams = {
  userId: string;
};

export type DeleteUserParams = UpdateUserParams;

export type GetUserParams = UpdateUserParams;
