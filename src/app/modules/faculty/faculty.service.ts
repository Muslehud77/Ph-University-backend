import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { facultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { userModel } from '../user/user.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fieldQuery();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getFacultyByIdFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id });
  return result;
};

const updateFacultyInDB = async (id: string, facultyData: Partial<TFaculty>) => {
  const result = await Faculty.findOneAndUpdate({ id }, facultyData, { new: true });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  const isFacultyExist = await Faculty.findOne({ id });

  if (!isFacultyExist) {
    throw new AppError(404, 'Student not found');
  }

  try {
    session.startTransaction();

    const deleteFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not delete faculty');
    }

    const deleteUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not delete user');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.BAD_REQUEST,
      (err as Error)?.message || 'Could not delete faculty',
    );
  }
};

export const facultyServices = {
  getAllFacultiesFromDB,
  getFacultyByIdFromDB,
  updateFacultyInDB,
  deleteFacultyFromDB,
};
