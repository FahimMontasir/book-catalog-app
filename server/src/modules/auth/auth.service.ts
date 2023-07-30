import { Secret } from 'jsonwebtoken';
import configs from '../../configs';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../shared/jwtHelper';
import { User } from './auth.model';
import { ILogin, ILoginResponse } from '../../interfaces/common';
import { IUser } from './auth.interface';

const createUser = async (user: IUser): Promise<Partial<IUser> | null> => {
  const { email } = user;
  const userExists = await User.isUserExist(email);
  if (userExists) {
    throw new ApiError(409, 'User already exist.');
  }

  const result = await User.create(user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...others } = result.toObject();

  return others;
};

const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist');
  }
  if (isUserExist.password && !(await User.isPasswordMatched(password, isUserExist.password))) {
    throw new ApiError(400, 'Password is incorrect.');
  }

  //create access token & refresh token
  const { _id, email: UEmail } = isUserExist;
  const accessToken = jwtHelper.createToken(
    { _id, email: UEmail },
    configs.jwt.secret as Secret,
    configs.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.createToken(
    { _id, email: UEmail },
    configs.jwt.refresh_secret as Secret,
    configs.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<{ accessToken: string }> => {
  // verify token
  let verifiedToken;
  try {
    verifiedToken = jwtHelper.verifyToken(token, configs.jwt.refresh_secret as Secret);
  } catch (error) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  //checking deleted user refresh token
  const isUserExist = await User.findById(verifiedToken._id);
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exits');
  }

  //generate new token
  const { _id, email } = isUserExist;
  const newAccessToken = jwtHelper.createToken(
    { _id, email },
    configs.jwt.secret as Secret,
    configs.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
};
