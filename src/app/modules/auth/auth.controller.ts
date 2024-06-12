import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { TLoginUser } from "./auth.interface";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {

    const result = await authServices.loginUser(req.body) as unknown as TLoginUser

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged in Successfully',
    data: result,
  };

  sendResponse<TLoginUser>(res, data);
});


export const authControllers = {
    loginUser
}