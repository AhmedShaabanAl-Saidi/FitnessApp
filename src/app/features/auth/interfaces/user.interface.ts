import { Gender } from '../enums/gender.enum';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender | string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  goal: string;
  photo: string;
  _id: string;
  createdAt: string;
}
