import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TCourse, TCourseFaculty } from './course.interface';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body;

  const result = await courseServices.createCourseIntoDB(courseData);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created a course Successfully',
    data: result,
  };

  sendResponse<TCourse>(res, data);
});

const getAllCorses = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await courseServices.getAllCorsesFromDB(query);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    meta: result.meta,
    data: result.result,
  };

  sendResponse(res, data);
});

const getCourseById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = (await courseServices.getSingleCourseByIdFromDB(
    id,
  )) as TCourse;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    data: result,
  };

  sendResponse<TCourse>(res, data);
});

const deleteCourse = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = (await courseServices.deleteSingleCourseFromDB(id)) as TCourse;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted a course Successfully',
    data: result,
  };

  sendResponse<TCourse>(res, data);
});

const updateSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;

  const courseData = req.body;

  const result = (await courseServices.updateSingleCourseInDB(
    id,
    courseData,
  )) as TCourse;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated a course Successfully',
    data: result,
  };

  sendResponse<TCourse>(res, data);
});

const getFacultiesForASingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;

  

  const result = (await courseServices.getFacultiesForASingleCourseFromDB(
    id,
    
  )) as unknown as TCourseFaculty;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved the faculties successfully',
    data: result,
  };

  sendResponse<TCourseFaculty>(res, data);
});


const assignFacultiesInCourseFaculties = catchAsync(async (req, res) => {
  const id = req.params.id;

  const { faculties } = req.body;

  const result = (await courseServices.assignFacultiesWithCourseIntoDB(
    id,
    faculties,
  )) as unknown as TCourseFaculty;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Assigned Faculties Successfully',
    data: result,
  };

  sendResponse<TCourseFaculty>(res, data);
});


const deleteFacultiesFromCourseFaculties = catchAsync(async (req, res) => {
  const id = req.params.id;

  const { faculties } = req.body;

  const result = (await courseServices.deleteFacultiesFromCourseFromDB(
    id,
    faculties,
  )) as unknown as TCourseFaculty;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Faculties Successfully',
    data: result,
  };

  sendResponse<TCourseFaculty>(res, data);
});

export const courseController = {
  createCourse,
  updateSingleCourse,
  deleteCourse,
  getAllCorses,
  getCourseById,
  assignFacultiesInCourseFaculties,
  deleteFacultiesFromCourseFaculties,
  getFacultiesForASingleCourse,
};
