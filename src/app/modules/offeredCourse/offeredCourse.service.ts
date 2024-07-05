import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
// import { offeredCourseSearchableFields } from './offeredCourse.constant';
import {
  TAssignedSchedules,
  TNewSchedules,
  TOfferedCourse,
} from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { SemesterRegistration } from './../semesterRegistration/semesterRegistration.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TSemesterRegistration } from '../semesterRegistration/semesterRegistration.interface';
import { TAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { TAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { TCourse } from '../course/course.interface';
import { TFaculty } from '../faculty/faculty.interface';
import { hasConflict, validate } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (offeredCourseData: TOfferedCourse) => {
  const {
    academicDepartment,
    academicFaculty,
    semesterRegistration,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = offeredCourseData;

  //first we need to check if the semester registration is exists
  const isSemesterRegistrationExists = (await SemesterRegistration.findById({
    _id: semesterRegistration,
  })) as TSemesterRegistration;

  validate(isSemesterRegistrationExists, 'Semester Registration', '');

  //we need to check if the academicFaculty is exists
  const isAcademicFacultyExists = (await AcademicFaculty.findById({
    _id: academicFaculty,
  })) as TAcademicFaculty;

  validate(isAcademicFacultyExists, 'Academic Faculty', '');

  //we need to check if the academicDepartment is exists
  const isAcademicDepartmentExists = (await AcademicDepartment.findById({
    _id: academicDepartment,
  })) as TAcademicDepartment;

  validate(isAcademicDepartmentExists, 'Academic Department', '');

  //we need to check if the course is exists
  const isCourseExists = (await Course.findById({
    _id: course,
  })) as TCourse;

  validate(isCourseExists, 'Course', '');

  //we need to check if the faculty is exists
  const isFacultyExists = (await Faculty.findById({
    _id: faculty,
  })) as TFaculty;

  validate(isFacultyExists, 'Faculty', '');

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  //check if department is belong to that faculty
  const isDepartmentBelongToFaculty = (await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  })) as TAcademicDepartment;

  validate(
    isDepartmentBelongToFaculty,
    '',
    `${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`,
  );

  //check if the same offered course and same section in same registered semester

  const isSameOfferedCourseAlreadyExistsWithSameSection =
    await OfferedCourse.findOne({ semesterRegistration, course, section });

  if (isSameOfferedCourseAlreadyExistsWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This offered course with same section already exists',
    );
  }

  // get the schedules of the faculties
  const assignedSchedules = (await OfferedCourse.find({
    faculty,
    days: { $all: days },
  }).select('days startTime endTime')) as unknown as TAssignedSchedules;
  console.log(assignedSchedules, 'hello');

  const newSchedules = { endTime, startTime } as TNewSchedules;

  const checkConflict = hasConflict(assignedSchedules, newSchedules, 'CREATE');

  if (checkConflict) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available at that time! Choose a different Time!',
    );
  }

  const result = await OfferedCourse.create({
    academicSemester,
    ...offeredCourseData,
  });
  return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fieldQuery();

  const result = await offeredCourseQuery.modelQuery;
  
   const meta = await offeredCourseQuery.countTotal();

   return { result, meta };
};

const getOfferedCourseByIdFromDB = async (id: string) => {
  const result = await OfferedCourse.findById({ _id: id });
  return result;
};

const updateOfferedCourseInDB = async (
  id: string,
  offeredCourseData: Partial<TOfferedCourse>,
) => {
  const { faculty, days, section, startTime, endTime } = offeredCourseData;

  //first we need to check if the semester offered course is exists
  const isOfferedCourseExists = (await OfferedCourse.findById({
    _id: id,
  })) as TOfferedCourse;

  validate(isOfferedCourseExists, 'Offered Course', '');

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  //need to check is the semesterRegistration is upcoming or not

  const semesterRegistrationStatus = await SemesterRegistration.findById({
    _id: semesterRegistration,
  }).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot update this offered course as the semester registration status is ${semesterRegistrationStatus?.status}`,
    );
  }

  //we need to check if the faculty is exists
  const isFacultyExists = (await Faculty.findById({
    _id: faculty,
  })) as TFaculty;

  validate(isFacultyExists, 'Faculty', '');

  // get the schedules of the faculties
  const assignedSchedules = (await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $all: days },
  }).select('days startTime endTime')) as unknown as TAssignedSchedules;

  const newSchedules = { endTime, startTime } as TNewSchedules;

  const checkConflict = hasConflict(assignedSchedules, newSchedules, 'UPDATE');

  if (checkConflict) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available at that time! Choose a different Time!',
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(
    { _id: id },
    offeredCourseData,
    {
      new: true,
    },
  );
  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  // check if the semester registration exist
  const isOfferedCourseExists = await OfferedCourse.findById({ _id: id });

  if (!isOfferedCourseExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This offered course does not exists!',
    );
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  //need to check is the semesterRegistration is upcoming or not

  const semesterRegistrationStatus = await SemesterRegistration.findById({
    _id: semesterRegistration,
  }).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot delete this offered course as the semester registration status is ${semesterRegistrationStatus?.status}`,
    );
  }

  const result = await OfferedCourse.findByIdAndDelete({ _id: id });
  return result;
};

export const offeredCourseServices = {
  getAllOfferedCourseFromDB,
  getOfferedCourseByIdFromDB,
  updateOfferedCourseInDB,
  createOfferedCourseIntoDB,
  deleteSemesterRegistrationFromDB,
};
