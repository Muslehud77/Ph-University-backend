import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { AcademicSemester } from './../academicSemester/academicSemester.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import mongoose from 'mongoose';

const createSemesterRegistrationToDB = async (
  semesterRegistration: TSemesterRegistration,
) => {
  const academicSemester = semesterRegistration?.academicSemester;

  //checking if there is any registration "UPCOMING" or "ONGOING"

  const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.find({
    $or: [
      { status: SemesterRegistrationStatus.ONGOING },
      { status: SemesterRegistrationStatus.UPCOMING },
    ],
  });

  if (isThereAnyUpcomingOrOngoingSemester.length) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester[0]?.status}registered semester!`,
    );
  }

  //checking if it is already exists
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This semester is already registered',
    );
  }

  //checking if the academic semester exists
  const isAcademicSemesterExists = await AcademicSemester.findById({
    _id: semesterRegistration?.academicSemester,
  });

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Academic Semester doesn't exists",
    );
  }
  const result = await SemesterRegistration.create(semesterRegistration);
  return result;
};

const findSemesterRegistrationByIdFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById({ _id: id });
  return result;
};

const findAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fieldQuery();

  const result = await semesterRegistrationQuery.modelQuery;


  const meta = await semesterRegistrationQuery.countTotal();

  return { result, meta };
};

const updateSemesterRegistrationInDB = async (
  id: string,
  semesterRegistrationData: Partial<TSemesterRegistration>,
) => {
  // if the requested semester is ended then we wont let admin to update the registered semester

  const requestedSemester = await SemesterRegistration.findById({ _id: id });

  if (!requestedSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'The semester does not exists!');
  }

  const currentSemesterStatus = requestedSemester?.status;
  const requestedStatus = semesterRegistrationData?.status;

  if (currentSemesterStatus === SemesterRegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'The semester is already ended!',
    );
  }

  // the main business logic here is we can update as following: UPCOMING --> ONGOING --> ENDED !Remember we cant do vise versa!

  if (
    (currentSemesterStatus === SemesterRegistrationStatus.UPCOMING &&
      requestedStatus === SemesterRegistrationStatus.ONGOING) ||
    (currentSemesterStatus === SemesterRegistrationStatus.ONGOING &&
      requestedStatus === SemesterRegistrationStatus.ENDED) ||
    !requestedStatus
  ) {
    const result = await SemesterRegistration.findByIdAndUpdate(
      { _id: id },
      semesterRegistrationData,
      { new: true },
    );

    return result;
  } else {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      requestedStatus
        ? `You cannot change the status from ${currentSemesterStatus} to ${requestedStatus}`
        : 'Request is not valid!',
    );
  }
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isSemesterRegistrationExists = (await SemesterRegistration.findById({
      _id: id,
    })) as TSemesterRegistration;

    if (!isSemesterRegistrationExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Academic Semester doesn't exists",
      );
    }

    if (isSemesterRegistrationExists.status !== 'UPCOMING') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `You cannot delete this as it is ${isSemesterRegistrationExists.status}`,
      );
    }

    const deleteTheOfferedCoursesByThisSemesterRegistration =
      await OfferedCourse.deleteMany({ semesterRegistration: id }, { session });

    if (!deleteTheOfferedCoursesByThisSemesterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Could not delete the offered courses',
      );
    }

    const result = await SemesterRegistration.findByIdAndDelete(
      { _id: id },
      { session },
    );

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Could not delete the Semester Registration',
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export const semesterRegistrationServices = {
  createSemesterRegistrationToDB,
  findSemesterRegistrationByIdFromDB,
  findAllSemesterRegistrationFromDB,
  updateSemesterRegistrationInDB,
  deleteSemesterRegistrationFromDB,
};
