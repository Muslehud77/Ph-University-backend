import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
// import { offeredCourseSearchableFields } from './offeredCourse.constant';
import { TOfferedCourse } from './offeredCourse.interface';
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


const createOfferedCourseIntoDB = async(offeredCourseData:TOfferedCourse)=>{
  const {
    academicDepartment,
    academicFaculty,
    semesterRegistration,
    course,
    faculty,
  } = offeredCourseData;


  const validate = (query: Record<string, unknown>, name: string) => {
    if (!query) {
      throw new AppError(httpStatus.NOT_FOUND, `${name} does not exists!`);
    }
  };

  //first we need to check if the semester registration is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById({
    _id: semesterRegistration,
  }) as TSemesterRegistration;

  validate(isSemesterRegistrationExists,"Semester Registration")

  //we need to check if the academicFaculty is exists
  const isAcademicFacultyExists = await AcademicFaculty.findById({
    _id: academicFaculty,
  }) as TAcademicFaculty;

  validate(isAcademicFacultyExists, 'Academic Faculty');

  //we need to check if the academicDepartment is exists
  const isAcademicDepartmentExists = await AcademicDepartment.findById({
    _id: academicDepartment,
  }) as TAcademicDepartment;

  validate(isAcademicDepartmentExists, 'Academic Department');



  //we need to check if the course is exists
  const isCourseExists = await Course.findById({
    _id: course,
  }) as TCourse;

  validate(isCourseExists, 'Course');

  //we need to check if the faculty is exists
  const isFacultyExists = await Faculty.findById({
    _id: faculty,
  }) as TFaculty;

    validate(isFacultyExists , 'Faculty');
  

 const academicSemester = isSemesterRegistrationExists.academicSemester
console.log(academicSemester);
  const result = await OfferedCourse.create({academicSemester,...offeredCourseData});
  return result;
}

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fieldQuery();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getOfferedCourseByIdFromDB = async (id: string) => {
  const result = await OfferedCourse.findById({ _id: id });
  return result;
};

const updateOfferedCourseInDB = async (id: string, offeredCourseData: Partial<TOfferedCourse>) => {
  
  const result = await OfferedCourse.findByIdAndUpdate(
    { _id: id },
    offeredCourseData,
    {
      new: true,
    },
  );
  return result;
};



export const offeredCourseServices = {
  getAllOfferedCourseFromDB,
  getOfferedCourseByIdFromDB,
  updateOfferedCourseInDB,
  createOfferedCourseIntoDB,
};
