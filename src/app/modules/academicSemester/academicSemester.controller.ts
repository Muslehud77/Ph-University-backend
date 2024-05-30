import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { academicSemesterServices } from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';
import { TAcademicSemester } from './academicSemester.interface';

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemesterData = req.body;

  const result =
    await academicSemesterServices.createSemesterToDB(academicSemesterData);

    const data = {
        statusCode : httpStatus.OK,
        success:true,
        message: "Semester created successfully",
        data: result
    }

    sendResponse<TAcademicSemester>(res,data)
});

export const AcademicSemesterControllers = {
    createAcademicSemester
}