import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { semesterRegistrationServices } from './semesterRegistration.service';
import sendResponse from '../../utils/sendResponse';
import { TSemesterRegistration } from './semesterRegistration.interface';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const semesterRegistration = req.body;
  const result =
    await semesterRegistrationServices.createSemesterRegistrationToDB(
      semesterRegistration,
    );

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration Created Successfully',
    data: result,
  };

  sendResponse<TSemesterRegistration>(res, data);
});

const updateSemesterRegistrationById = catchAsync(async (req, res) => {
  const semesterRegistrationData = req.body;
  const id = req.params.id;
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationInDB(
      id,
      semesterRegistrationData,
    );

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester RegistrationUpdated Successfully',
    data: result,
  };

  sendResponse(res, data);
});
const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await semesterRegistrationServices.deleteSemesterRegistrationFromDB(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Deleted Successfully',
    data: result,
  };

  sendResponse(res, data);
});

const getSemesterRegistrationById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result =
    (await semesterRegistrationServices.findSemesterRegistrationByIdFromDB(
      id,
    )) as unknown as TSemesterRegistration;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Here is the Semester Registration',
    data: result,
  };

  sendResponse<TSemesterRegistration>(res, data);
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const query = req.query;
  const result =
    await semesterRegistrationServices.findAllSemesterRegistrationFromDB(query);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Here is All the Semester Registrations',
    data: result,
  };

  sendResponse(res, data);
});

export const semesterRegistrationControllers = {
  getAllSemesterRegistration,
  getSemesterRegistrationById,
  updateSemesterRegistrationById,
  createSemesterRegistration,
  deleteSemesterRegistration,
};
