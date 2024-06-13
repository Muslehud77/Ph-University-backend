import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { TUserRole } from '../modules/user/user.interface';

const Auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;

    // if the token is sent from the client
    
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // check if the token is valid
    jwt.verify(token, config.jwt_access_secret, (err, decoded) => {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const role = (decoded as JwtPayload).role;

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      console.log(role, decoded);
      req.user = decoded as JwtPayload;

      next();
    });
  });
};

export default Auth;
