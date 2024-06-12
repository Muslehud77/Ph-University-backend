import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (loginUserData: TLoginUser) => {
  //check if the user is exist, is user is deleted and is user is blocked

  const user = await userModel.isUserHasAccess(loginUserData.id);

  //check if the password is matching

  await userModel.isPasswordMatched(
    loginUserData.password,
    user.password,
  );

  //Access Granted : Send AccessToken , RefreshToken
  //Create a token and send to the client

  const jwtPayload = {
    id: user.id,
    role:user.role
  };
const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, { expiresIn: "10d" });

console.log(user);

return {
  accessToken,
  isPasswordNeedsChange : user.isPasswordNeedsChange
};


};

export const authServices = {
  loginUser,
};
