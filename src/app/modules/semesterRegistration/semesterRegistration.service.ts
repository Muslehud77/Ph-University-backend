import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import { AcademicSemester } from './../academicSemester/academicSemester.model';
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";


const createSemesterRegistrationToDB = async (
  semesterRegistration: TSemesterRegistration,
) => {
  const academicSemester = semesterRegistration?.academicSemester

  //checking if there is any registration "UPCOMING" or "ONGOING"




  //checking if it is already exists
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This semester is already registered",
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

const findAllSemesterRegistrationFromDB = async (query:Record<string,unknown>) => {

  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),query
  ).filter().sort().paginate().fieldQuery()


  const result = await semesterRegistrationQuery.modelQuery
  return result;
};

const updateSemesterRegistrationInDB = async (
  id: string,
  semesterRegistration: TSemesterRegistration,
) => {
  const result = await SemesterRegistration.findByIdAndUpdate(
    { _id: id },
    semesterRegistration,
    { new: true },
  );

  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationToDB,
  findSemesterRegistrationByIdFromDB,
  findAllSemesterRegistrationFromDB,
  updateSemesterRegistrationInDB,
};
