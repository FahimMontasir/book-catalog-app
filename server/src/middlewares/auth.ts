import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import ApiError from '../errors/ApiError';
import { jwtHelper } from '../shared/jwtHelper';
import configs from '../configs';

const auth =
  () =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) throw new ApiError(403, 'You are not authorized!');

      //verify token
      const verifiedUser = jwtHelper.verifyToken(token, configs.jwt.secret as Secret);

      req.user = verifiedUser;

      return next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
