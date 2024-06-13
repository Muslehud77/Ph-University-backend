import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { TLoginUser } from './auth.interface';
import catchAsync from '../../utils/catchAsync';
import { authServices } from './auth.service';
import config from '../../config';


const loginUser = catchAsync(async (req, res) => {
  const result = (await authServices.loginUser(
    req.body,
  )) as unknown as TLoginUser;

  const {accessToken, refreshToken,isPasswordNeedsChange } = result;
  res.cookie('refreshToken', refreshToken,{
    secure:config.node_env === "production",
    httpOnly:true
  });

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged in Successfully',
    data: {
      accessToken,
      isPasswordNeedsChange,
    },
  };

  sendResponse(res, data);
});

const changePassword = catchAsync(async (req, res) => {
  const result = await authServices.changePassword(req.body, req.user);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password Changed Successfully',
    data: result,
  };

  sendResponse(res, data);
});

const refreshToken = catchAsync(async (req, res) => {

  const {refreshToken} = req.cookies
  const result = await authServices.refreshTokenService(refreshToken);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token has been retrieved successfully',
    data: result,
  };

  sendResponse(res, data);
});



export const authControllers = {
  loginUser,
  changePassword,
  refreshToken,
};
