import { User } from './user.interface';

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  message: string;
  user: User;
  token: string;
}