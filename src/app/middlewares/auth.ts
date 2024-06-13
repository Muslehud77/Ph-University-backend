import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { TUser, TUserRole } from '../modules/user/user.interface';

import { userModel } from './../modules/user/user.model';

const Auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;

    // if the token is sent from the client

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(token, config.jwt_access_secret) as JwtPayload;
    const {id,role,iat} = decoded

    //checking if the user checks all the requirements
   const user = await userModel.isUserHasAccess(id) as TUser

  

    if (
      user.passwordChangedAt &&
      userModel.isJWTIssuesBeforePasswordChange(user?.passwordChangedAt, iat as number)
    ){
      throw new AppError(httpStatus.UNAUTHORIZED,"Logout and log back in!")
    }
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
    console.log(role, decoded);
    req.user = decoded as JwtPayload;

    next();
  });
};

export default Auth;
