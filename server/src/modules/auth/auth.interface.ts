import { Model, Document } from 'mongoose';

export type IUser = Document & {
  email: string;
  password: string;
};

export type IUserModel = {
  isUserExist(phoneNumber: string): Promise<Pick<IUser, 'email' | '_id' | 'password'> | null>;
  isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>;
} & Model<IUser>;
