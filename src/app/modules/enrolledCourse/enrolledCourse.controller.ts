import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { enrolledCourseServices } from "./enrolledCourse.service";
import sendResponse from "../../utils/sendResponse";


const createEnrolledCourse = catchAsync(async (req, res) => {
  const enrolledCourseData = req.body;

  const {id} = req.user

  const result =
    await enrolledCourseServices.createEnrolledCourseIntoDB(
      id,enrolledCourseData,
    );
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'EnrolledCourse created successfully',
    data: result,
  };

  sendResponse(res, data);
});


export const enrolledCourseController = {
  createEnrolledCourse,
}; 