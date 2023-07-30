import jwt, { Secret } from 'jsonwebtoken';
import { IDecodedUser, IJwtPayload } from '../interfaces/common';

const createToken = (payload: IJwtPayload, secret: Secret, expireTime: string): string => {
  return jwt.sign(payload, secret, { expiresIn: expireTime });
};

const verifyToken = (token: string, secret: Secret): IDecodedUser => {
  return jwt.verify(token, secret) as IDecodedUser;
};

export const jwtHelper = {
  createToken,
  verifyToken,
};
