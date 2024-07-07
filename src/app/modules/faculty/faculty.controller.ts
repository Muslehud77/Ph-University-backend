import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { facultyServices } from './faculty.service';
import sendResponse from '../../utils/sendResponse';
import { TFaculty } from './faculty.interface';

const getAllFaculties = catchAsync(async (req, res) => {
  const query = req.query;

 

  const result = await facultyServices.getAllFacultiesFromDB(query);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    meta: result.meta,
    data: result.result,
  };

  sendResponse(res, data);
});

const getFacultyById = catchAsync(async (req, res) => {
  const id = req.params.id;
  
  const result = (await facultyServices.getFacultyByIdFromDB(id)) as TFaculty;
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    data: result,
  };

  sendResponse<TFaculty>(res, data);
});

const updateFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { faculty } = req.body;
  const result = (await facultyServices.updateFacultyInDB(
    id,
    faculty,
  )) as TFaculty;
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated Successfully',
    data: result,
  };

  sendResponse<TFaculty>(res, data);
});

const deleteFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await facultyServices.deleteFacultyFromDB(id);
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  };

  sendResponse(res, data);
});

export const facultyController = {
  getFacultyById,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
};
