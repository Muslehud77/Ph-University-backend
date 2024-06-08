import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import { AcademicSemester } from './../academicSemester/academicSemester.model';
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";


const createSemesterRegistrationToDB = async (
  semesterRegistration: TSemesterRegistration,
) => {
  const academicSemester = semesterRegistration?.academicSemester

  //checking if there is any registration "UPCOMING" or "ONGOING"

const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.find({
  $or: [
    { status: SemesterRegistrationStatus.ONGOING },
    { status: SemesterRegistrationStatus.UPCOMING },
  ],
});


console.log(isThereAnyUpcomingOrOngoingSemester);

if(isThereAnyUpcomingOrOngoingSemester){
  throw new AppError(
    httpStatus.BAD_REQUEST,
    `There is already an ${isThereAnyUpcomingOrOngoingSemester[0]?.status}registered semester!`,
  );
}

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
  semesterRegistrationData: Partial<TSemesterRegistration>,
) => {

  // if the requested semester is ended then we wont let admin to update the registered semester

  const requestedSemester = await SemesterRegistration.findById({_id:id})

  if(!requestedSemester){
    throw new AppError(httpStatus.NOT_FOUND,"The semester does not exists!")
  }

  const currentSemesterStatus = requestedSemester?.status; 
  const requestedStatus = semesterRegistrationData?.status


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

export const semesterRegistrationServices = {
  createSemesterRegistrationToDB,
  findSemesterRegistrationByIdFromDB,
  findAllSemesterRegistrationFromDB,
  updateSemesterRegistrationInDB,
};
