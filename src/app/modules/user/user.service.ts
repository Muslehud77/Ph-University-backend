/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

import { userModel } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { AcademicDepartment } from './../academicDepartment/academicDepartment.model';
import { TAcademicDepartment } from '../academicDepartment/academicDepartment.interface';

const createStudentIntoDB = async (
  image: any,
  password: string,
  studentData: TStudent,
) => {
  // find academic semester info
  const admissionSemester = (await AcademicSemester.findById({
    _id: studentData.admissionSemester,
  })) as TAcademicSemester;
  const academicDepartment = (await AcademicDepartment.findById({
    _id: studentData.academicDepartment,
  })) as TAcademicDepartment;

  if (!admissionSemester || !academicDepartment) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Admission semester or Academic department is not present',
    );
  }

  studentData.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userData: Partial<TUser> = {
      id: await generateStudentId(admissionSemester),
      password: password || config.defaultPassword,
      email: studentData.email,
      role: 'student',
    };

    if (image) {
      const imageName = `${userData.id}${studentData?.name?.firstName}`;
      const path = image?.path;
      //sending image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);

      studentData.profileImg = (secure_url as string) || '';
    }

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

const createAdminIntoDB = async (
  image: any,
  password: string,
  adminData: TAdmin,
) => {
  const session = await mongoose.startSession();

  

  const userData: Partial<TUser> = {
    id: await generateAdminId(),
    password: password || config.defaultPassword,
    email: adminData.email,
    role: 'admin',
  };

  if(image){
    const imageName = `${userData.id}${adminData?.name?.firstName}`;
    const path = image?.path;
    //sending image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);

    adminData.profileImage = (secure_url as string) || '';
  }

  try {
    session.startTransaction();

    const newUser = await userModel.create([userData], { session });

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not create user');
    }

    adminData.id = newUser[0]?.id;
    adminData.user = newUser[0]?._id;

    const newAdmin = await Admin.create([adminData], { session });

    if (!newAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      err.message || 'Could not create admin',
    );
  }
};
const createFacultyIntoDB = async (
  image: any,
  password: string,
  facultyData: TFaculty,
) => {
  const session = await mongoose.startSession();


  const academicDepartment = (await AcademicDepartment.findById({
    _id: facultyData.academicDepartment,
  })) as TAcademicDepartment;

  if(!academicDepartment){
    throw new AppError(httpStatus.NOT_FOUND, 'Could not find provided academic department!');
  }

  facultyData.academicFaculty = academicDepartment.academicFaculty

  const userData: Partial<TUser> = {
    id: await generateFacultyId(),
    password: password || config.defaultPassword,
    email: facultyData.email,
    role: 'faculty',
  };

 if(image){
   const imageName = `${userData.id}${facultyData?.name?.firstName}`;
   const path = image?.path;
   //sending image to cloudinary
   const { secure_url } = await sendImageToCloudinary(imageName, path);

   facultyData.profileImage = (secure_url as string) || '';
 }

  try {
    session.startTransaction();

    const newUser = await userModel.create([userData], { session });

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not create user');
    }

    facultyData.id = newUser[0]?.id;
    facultyData.user = newUser[0]?._id;

    const newFaculty = await Faculty.create([facultyData], { session });

    if (!newFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      err.message || 'Could not create faculty',
    );
  }
};

const getMe = async (id: string, role: string) => {
  const user = await userModel.isUserHasAccess(id);

  if (role === 'student') {
    return await Student.findOne({ id: user?.id }).populate('user');
  } else if (role === 'admin') {
    return await Admin.findOne({ id: user?.id }).populate('user');
  } else if (role === 'faculty') {
    return await Faculty.findOne({ id: user?.id }).populate('user');
  } else {
    throw new AppError(404, 'Could not find the user!');
  }
};

const changeStatus = async (id: string, status: { status: string }) => {
  const result = await userModel.findByIdAndUpdate({ _id: id }, status, {
    new: true,
  });
  return result;
};

export const userServices = {
  createStudentIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB,
  getMe,
  changeStatus,
};
