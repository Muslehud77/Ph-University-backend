import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

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
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    isPasswordNeedsChange: user.isPasswordNeedsChange,
  };
};

const changePassword = async (userPasswordData:TChangePassword,userData : {id:string,role:string})=>{
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
  const result = await userModel.findOneAndUpdate(
    { id: user.id, role: user.role },
    { password: newEncryptedPassword },
  );

  return result;
  
}


export const authServices = {
  loginUser,
  changePassword,
};
