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
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester created successfully',
    data: result,
  };

  sendResponse<TAcademicSemester>(res, data);
});

const updateSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const academicSemesterData = req.body;

  const result = await academicSemesterServices.updateSemesterInDB(
    id,
    academicSemesterData,
  ) as unknown as TAcademicSemester;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated successfully',
    data: result,
  };

  sendResponse<TAcademicSemester>(res, data);
});

const findSemesterById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = (await academicSemesterServices.findSemesterByIdFromDB(
    id,
  )) as unknown as TAcademicSemester;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Found the semester',
    data: result,
  };

  sendResponse<TAcademicSemester>(res, data);
});

const findAllSemestersFromDB = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.findAllSemestersFromDB();

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Here is All the semesters',
    data: result,
  };

  sendResponse(res, data);
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  findAllSemestersFromDB,
  findSemesterById,
  updateSemester,
};
