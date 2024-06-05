import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

import { userModel } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // find academic semester info
  const admissionSemester = (await AcademicSemester.findById({
    _id: studentData.admissionSemester,
  })) as TAcademicSemester;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userData: Partial<TUser> = {
      id: await generateStudentId(admissionSemester),
      password: password || config.defaultPassword,
      role: 'student',
    };

    //creating a user first
    //transaction-1
    const newUser = await userModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    //transaction-2
    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
   
  }
};

export const userServices = {
  createStudentIntoDB,
};
