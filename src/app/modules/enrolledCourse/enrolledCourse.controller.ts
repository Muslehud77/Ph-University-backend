import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { enrolledCourseServices } from "./enrolledCourse.service";
import sendResponse, { TMeta } from "../../utils/sendResponse";
import { TEnrolledCourse } from "./enrolledCourse.interface";


const createEnrolledCourse = catchAsync(async (req, res) => {
  const enrolledCourseData = req.body;

  const {id} = req.user


  const result =
    await enrolledCourseServices.createEnrolledCourseIntoDB(
      id,enrolledCourseData,
    ) as TEnrolledCourse;
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'EnrolledCourse created successfully',
    data: result,
  };

  sendResponse<TEnrolledCourse>(res, data);
});

const updateEnrolledCourse = catchAsync(async (req, res) => {
  const enrolledCourseData = req.body;
  const {id} = req.user
  

  const result =
    await enrolledCourseServices.updateEnrolledCourseIntoDB(id,
      enrolledCourseData,
    ) as unknown as TEnrolledCourse;
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'EnrolledCourse updated successfully',
    data: result,
  };

  sendResponse<TEnrolledCourse>(res, data);
});
const myEnrolledCourses = catchAsync(async (req, res) => {
  
  const {id} = req.user 

  const result =
    await enrolledCourseServices.getMyEnrolledCoursesFromDB(id) as unknown as TEnrolledCourse[];
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Enrolled CoursesRetrieved successfully',
    data: result,
  };

  sendResponse<TEnrolledCourse[]>(res, data);
});
const getAllEnrolledCourses = catchAsync(async (req, res) => {
  
  const user = req.user
  const query = req.query

  const result = await enrolledCourseServices.getAllEnrolledCoursesFromDB(user,query) as unknown as {result:TEnrolledCourse[],meta:TMeta};

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Enrolled CoursesRetrieved successfully',
    data: result.result,
    meta:result.meta
  };

  sendResponse<TEnrolledCourse[]>(res, data);
});





export const enrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourse,
  getAllEnrolledCourses,
  myEnrolledCourses,
}; 