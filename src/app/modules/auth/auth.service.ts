import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (loginUserData: TLoginUser) => {
  //check if the user is exist, is user is deleted and is user is blocked

  const isUserHasAccess = await userModel.isUserHasAccess(loginUserData.id);

  //check if the password is matching

  await userModel.isPasswordMatched(
    loginUserData.password,
    isUserHasAccess.password,
  );

  //Access Granted : Send AccessToken , RefreshToken


  
};

export const authServices = {
  loginUser,
};
