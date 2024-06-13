import { RequestHandler } from 'express';

import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { TStudent } from '../student/student.interface';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { TAdmin } from '../admin/admin.interface';
import { TFaculty } from '../faculty/faculty.interface';

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student } = req.body;

  // will call service func to send this data
  const result = (await userServices.createStudentIntoDB(
    password,
    student,
  )) as unknown as TStudent;
  // send response

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Created Successfully',
    data: result,
  };
  sendResponse<TStudent>(res, data);
});

const createAdmin = catchAsync(async (req, res, next) => {
  const { password, admin } = req.body;

  // will call service func to send this data
  const result = (await userServices.createAdminIntoDB(
    password,
    admin,
  )) as unknown as TAdmin;
  // send response

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is Created Successfully',
    data: result,
  };
  sendResponse<TAdmin>(res, data);
});
const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty } = req.body;

  // will call service func to send this data
  const result = (await userServices.createFacultyIntoDB(
    password,
    faculty,
  )) as unknown as TFaculty;
  // send response

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is Created Successfully',
    data: result,
  };
  sendResponse<TFaculty>(res, data);
});

export const userController = { createStudent, createAdmin, createFaculty };
