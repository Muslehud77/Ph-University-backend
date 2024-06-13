import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { TStudent } from './student.interface';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getStudentByID = catchAsync(async (req, res) => {
  const id: string = req.params.id;
  const result = (await studentServices.getStudentByIdFromDB(
    id,
  )) as unknown as TStudent;

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    data: result,
  };

  sendResponse<TStudent>(res, data);
});

const getAllStudent = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await studentServices.getAllStudentsFromDB(query);
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Query Success',
    data: result,
  };

  sendResponse(res, data);
});

const deleteStudent = catchAsync(async (req, res) => {
  const studentId: string = req.params.id;
  const result = await studentServices.deleteStudentFromDB(studentId);
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Successfully',
    data: result,
  };

  sendResponse(res, data);
});

const updateStudent = catchAsync(async (req, res) => {
  const studentId: string = req.params.id;
  const studentData = req.body.student;
  const result = await studentServices.updateStudentInDB(
    studentId,
    studentData,
  );
  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Updated Successfully',
    data: result,
  };

  sendResponse(res, data);
});

export const studentControllers = {
  getStudentByID,
  getAllStudent,
  deleteStudent,
  updateStudent,
};
