import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { academicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import { TAcademicFaculty } from './academicFaculty.interface';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const academicFaculty = req.body;
  const result =
    await academicFacultyServices.createAcademicFacultyIntoDB(academicFaculty);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created Successfully',
    data: result,
  };

  sendResponse<TAcademicFaculty>(res, data);
});

const updateAcademicFacultyById = catchAsync(async (req, res) => {
  const academicFacultyData = req.body;
  const id = req.params.id;
  const result = await academicFacultyServices.updateFacultyByIdFromDB(
    id,
    academicFacultyData,
  );

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Updated Successfully',
    data: result,
  };

  sendResponse(res, data);
});

const getAcademicFacultyById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = (await academicFacultyServices.getAcademicFacultyByIdFromDB(
    id,
  )) as unknown as TAcademicFaculty;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Here is the Academic Faculty',
    data: result,
  };

  sendResponse<TAcademicFaculty>(res, data);
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultiesFromDB();

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Here is All the Academic Faculties',
    data: result,
  };

  sendResponse(res, data);
});

export const academicFacultyControllers = {
  getAllAcademicFaculty,
  getAcademicFacultyById,
  updateAcademicFacultyById,
  createAcademicFaculty,
};
