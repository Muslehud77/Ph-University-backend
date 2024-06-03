import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import { userModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.findById({ _id: id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  const studentId = { id: id };


  if(!await Student.isUserExists(id)){
    throw new AppError(404,'Student not found')
  }

  try {
    session.startTransaction();

    //transaction -1
    const deletedStudent = await Student.findOneAndUpdate(
      studentId,
      { isDeleted: true },
      { new: true, session },
    );

    console.log(deletedStudent);

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not delete student');
    }

    //transaction -2
    const deletedUser = await userModel.findOneAndUpdate(
      studentId,
      { isDeleted: true },
      { new: true, session },
    );
    
    if (!deletedUser) {
   
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
   await session.abortTransaction();
   await session.endSession();
  }
};

export const studentServices = {
  getStudentByIdFromDB,
  getAllStudentsFromDB,
  deleteStudentFromDB,
};
