import { NextFunction, Request, Response } from 'express';

import { studentServices } from './student.service';

const getStudentByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id: string = req.params.id;
    const result = await studentServices.getStudentByIdFromDB(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Query Successful',
      data: result,
    });
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

    res.status(200).json({
      success: true,
      message: 'Query Successful',
      data: result,
    });
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
    res.status(200).json({
      success: true,
      message: 'Deleted Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getStudentByID,
  getAllStudent,
  deleteStudent,
};
