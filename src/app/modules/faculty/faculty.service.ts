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


   const meta = await facultyQuery.countTotal();

   return { result, meta };
};

const getFacultyByIdFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id: id });
  return result;
};

const updateFacultyInDB = async (
  id: string,
  facultyData: Partial<TFaculty>,
) => {
  const { name, ...remainingFacultyData } = facultyData;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(
    { _id: id },
    modifiedUpdatedData,
    {
      new: true,
    },
  );
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  const isFacultyExist = await Faculty.findById({ _id: id });

  if (!isFacultyExist) {
    throw new AppError(404, 'Faculty not found');
  }

  try {
    session.startTransaction();

    const deleteFaculty = await Faculty.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not delete faculty');
    }

    const deleteUser = await userModel.findByIdAndUpdate(
      { _id: deleteFaculty?.user },
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
