import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

const Auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;

    // if the token is sent from the client
    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED,"You are not authorized!")
    }

    // check if the token is valid
   jwt.verify(token, config.jwt_access_secret,(err,decoded)=>{
        if(err){
              throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are not authorized!',
              );
            }
            const {userId,role} = decoded
            
         
    })

    next();
  });
};

export default Auth;
