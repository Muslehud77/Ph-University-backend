import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { adminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { userModel } from '../user/user.model';

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fieldQuery();

  const result = await adminQuery.modelQuery;
  return result;
};

const getAdminByIdFromDB = async (id: string) => {
  const result = await Admin.findById({_id: id });
  return result;
};

const updateAdminInDB = async (id: string, adminData: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = adminData;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate({_id: id }, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  const isAdminExist = await Admin.findById({_id: id });

  if (!isAdminExist) {
    throw new AppError(404, 'Admin not found');
  }

  try {
    session.startTransaction();

    const deleteAdmin = await Admin.findByIdAndUpdate(
      {_id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not delete admin');
    }

    const deleteUser = await userModel.findByIdAndUpdate(
      {_id: deleteAdmin?.user },
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
      (err as Error)?.message || 'Could not delete admin',
    );
  }
};

export const adminServices = {
  getAllAdminFromDB,
  getAdminByIdFromDB,
  updateAdminInDB,
  deleteAdminFromDB,
};
