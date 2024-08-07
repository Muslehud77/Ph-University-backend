import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendResponse';

import { TOfferedCourse } from './offeredCourse.interface';
import { offeredCourseServices } from './offeredCourse.service';

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await offeredCourseServices.getAllOfferedCourseFromDB(query);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    meta: result.meta,
    data: result.result,
  };

  sendResponse(res, data);
});


const getMyOfferedCourse = catchAsync(async (req, res) => {
  const {id} = req.user;
  const query = req.query
  const result = await offeredCourseServices.getMyOfferedCourseFromDB(
    id,
    query,
  );

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    meta: result.meta,
    data: result.result,
  };

  sendResponse(res, data);
});

const getOfferedCourseById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = (await offeredCourseServices.getOfferedCourseByIdFromDB(
    id,
  )) as TOfferedCourse;
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    data: result,
  };

  sendResponse<TOfferedCourse>(res, data);
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const offeredCourse = req.body;
  const result = (await offeredCourseServices.updateOfferedCourseInDB(
    id,
    offeredCourse,
  )) as unknown as TOfferedCourse;
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    data: result,
  };

  sendResponse<TOfferedCourse>(res, data);
});

const createOfferedCourse = catchAsync(async (req, res) => {
  const offeredCourseData = req.body;

  const result =
    await offeredCourseServices.createOfferedCourseIntoDB(offeredCourseData);
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse created successfully',
    data: result,
  };

  sendResponse(res, data);
});

const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await offeredCourseServices.deleteSemesterRegistrationFromDB(id);
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Registration deleted successfully!',
    data: result,
  };

  sendResponse(res, data);
});

export const offeredCourseController = {
  getOfferedCourseById,
  getAllOfferedCourses,
  updateOfferedCourse,
  createOfferedCourse,
  deleteSemesterRegistration,
  getMyOfferedCourse,
};
