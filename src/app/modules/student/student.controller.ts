import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { TStudent } from './student.interface';
import httpStatus from 'http-status';

const getStudentByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id: string = req.params.id;
    const result = await studentServices.getStudentByIdFromDB(id) as unknown as TStudent;

    const data = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Query Success',
      data: result,
    };

 
 sendResponse<TStudent>(res, data);
  } catch (err) {
    next(err);
  }
};

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();

     const data = {
       statusCode: httpStatus.OK,
       success: true,
       message: 'Query Success',
       data: result,
     };

     sendResponse(res, data);
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId: string = req.params.id;
    const result = await studentServices.deleteStudentFromDB(studentId);
   const data = {
       statusCode: httpStatus.OK,
       success: true,
       message: 'Deleted Successfully',
       data: result,
     };

     sendResponse(res, data);
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getStudentByID,
  getAllStudent,
  deleteStudent,
};
