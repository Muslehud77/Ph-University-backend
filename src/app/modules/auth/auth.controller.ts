import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { TLoginUser } from "./auth.interface";
import catchAsync from "../../utils/catchAsync";

const loginUser = catchAsync(async (req, res) => {


  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged in Successfully',
    data: result,
  };

  sendResponse<TLoginUser>(res, data);
});


export const AuthControllers = {
    loginUser
}