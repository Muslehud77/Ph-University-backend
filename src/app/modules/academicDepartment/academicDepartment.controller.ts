import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { academicDepartmentServices } from './academicDepartment.service';
import { TAcademicDepartment } from './academicDepartment.interface';
import sendResponse, { TMeta } from '../../utils/sendResponse';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const academicDepartment = req.body;
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(
      academicDepartment,
    );

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created Successfully',
    data: result,
  };

  sendResponse<TAcademicDepartment>(res, data);
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const query = req.query
  const result =
    (await academicDepartmentServices.getAllAcademicDepartmentsFromDB(query)) as {result:TAcademicDepartment[], meta:TMeta};

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Department Retrieved Successfully',
    meta: result.meta,
    data: result.result,
  };

  sendResponse<TAcademicDepartment[]>(res, data);
});

const getAcademicDepartmentById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    (await academicDepartmentServices.getAcademicDepartmentByIdFromDB(
      id,
    )) as TAcademicDepartment;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Retrieved Successfully',
    data: result,
  };

  sendResponse<TAcademicDepartment>(res, data);
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const academicDepartment = req.body;
  const result = (await academicDepartmentServices.updateAcademicDepartmentInDB(
    id,
    academicDepartment,
  )) as TAcademicDepartment;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Updated Successfully',
    data: result,
  };

  sendResponse<TAcademicDepartment>(res, data);
});

export const academicDepartmentControllers = {
  updateAcademicDepartment,
  getAcademicDepartmentById,
  getAllAcademicDepartments,
  createAcademicDepartment,
};
