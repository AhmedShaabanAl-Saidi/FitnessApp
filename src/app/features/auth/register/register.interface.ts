export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  activityLevel: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  rePassword?: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  activityLevel: string;
}

export interface SignupResponse {
  message: string;
  token: string;
  user?: User;
}