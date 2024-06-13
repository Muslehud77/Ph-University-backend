import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { generateToken } from './auth.utils';

const loginUser = async (loginUserData: TLoginUser) => {
  //check if the user is exist, is user is deleted and is user is blocked

  const user = await userModel.isUserHasAccess(loginUserData.id);

  //check if the password is matching

  await userModel.isPasswordMatched(loginUserData.password, user.password);

  //Access Granted : Send AccessToken , RefreshToken
  //Create a token and send to the client

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expiresIn,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expiresIn,
  );
   




  return {
    accessToken,
    refreshToken,
    isPasswordNeedsChange: user.isPasswordNeedsChange,
  };
};

const changePassword = async (
  userPasswordData: TChangePassword,
  userData: JwtPayload,
) => {
  //check if the user is exist, is user is deleted and is user is blocked
  const user = await userModel.isUserHasAccess(userData.id);

  //checking if the current password is matching with the old password
  await userModel.isPasswordMatched(
    userPasswordData.oldPassword,
    user.password,
  );

  // converting new password
  const newEncryptedPassword = await bcrypt.hash(
    userPasswordData.newPassword,
    config.hashSaltRounds,
  );

  //change the password
  await userModel.findOneAndUpdate(
    { id: user.id, role: user.role },
    {
      password: newEncryptedPassword,
      isPasswordNeedsChange: false,
      passwordChangedAt : new Date(),
    },
  );

  return { message: 'password has been changed' };
};

const refreshTokenService = async ()=>{
  
}

export const authServices = {
  loginUser,
  changePassword,
  refreshTokenService
};
