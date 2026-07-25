export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  age: number;
  goal: string;
  activityLevel: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  goal: string;
  photo: string;
  _id: string;
  createdAt: string;
}

export interface SignupResponse {
  message: string;
  user: User;
  token: string;
}

export interface ActivityLevel {
  _id: string;
  name: string;
}

export interface ActivityLevelsResponse {
  message: string;
  levels: ActivityLevel[];
}