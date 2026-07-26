import { Gender } from '../enums/gender.enum';
import { User } from './user.interface';

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  gender: Gender;
  height: number;
  weight: number;
  age: number;
  goal: string;
  activityLevel: string;
}

export interface SignupResponse {
  message: string;
  user: User;
  token: string;
}
