export interface NewUserRequestBody {
  name: string;
  email: string;
  image: string;
  role: string;
  gender: string;
  dob: Date;
  password: string;
}

export interface LoginUserRequestBody {
  email: string;
  password: string;
}
