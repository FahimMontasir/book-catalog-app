import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { hashPassword } from '../../shared/hashPassword';
import { IUser, IUserModel } from './auth.interface';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
});

userSchema.statics.isUserExist = async function (email) {
  return await User.findOne({ email }, { _id: 1, password: 1, email: 1 }).lean();
};

userSchema.statics.isPasswordMatched = async function (givenPass, savedPass) {
  return await bcrypt.compare(givenPass, savedPass);
};

// this pre hook only works User.create() || user.save()
userSchema.pre('save', async function (next) {
  // hashing user password
  this.password = await hashPassword(this.password);

  next();
});

export const User = model<IUser, IUserModel>('User', userSchema);
