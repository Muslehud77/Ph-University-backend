import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { TStudent } from '../student/student.interface';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { TAdmin } from '../admin/admin.interface';
import { TFaculty } from '../faculty/faculty.interface';
import { TUser } from './user.interface';

const createStudent = catchAsync(async (req, res) => {
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

const createAdmin = catchAsync(async (req, res) => {
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

const createFaculty = catchAsync(async (req, res) => {
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

const getMe = catchAsync(async (req, res) => {
  const { id, role } = req.user;

  // will call service func to send this data
  const result = (await userServices.getMe(id, role)) as Partial<
    TAdmin | TStudent | TFaculty
  >;
  // send response

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Got the user successfully!',
    data: result,
  };
  sendResponse<Partial<TAdmin | TStudent | TFaculty>>(res, data);
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const status = req.body;

  // will call service func to send this data
  const result = (await userServices.changeStatus(id, status)) as TUser;
  // send response

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Changed the status successfully!',
    data: result,
  };
  sendResponse<TUser>(res, data);
});

export const userController = {
  createStudent,
  createAdmin,
  createFaculty,
  getMe,
  changeStatus,
};
