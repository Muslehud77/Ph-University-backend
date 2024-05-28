import { RequestHandler } from 'express';

import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { TStudent } from '../student/student.interface';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res,next) => {
  try {
    //* data validation using Joi
    const { password,student } = req.body

    //* data validation using Zod
    // const student = await zodStudentValidationSchema.parseAsync(
    //   req.body.student,
    // );

    // will call service func to send this data
    const result = await userServices.createStudentIntoDB(password,student) as TStudent;
    // send response

    const data = {
      statusCode : httpStatus.OK,
      success: true,
      message: 'Student is Created Successfully',
      data: result,
    };
    sendResponse<TStudent>(res,data)

  } catch (err) {
    next(err)
  }
});


export const userController = {createStudent}