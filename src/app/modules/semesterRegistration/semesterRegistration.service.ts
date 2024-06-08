import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";


const createSemesterRegistrationToDB = async (
  semesterRegistration: TSemesterRegistration,
) => {
  const result = await SemesterRegistration.create(semesterRegistration);
  return result;
};

const findSemesterRegistrationByIdFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById({ _id: id });
  return result;
};

const findAllSemesterRegistrationFromDB = async () => {
  const result = await SemesterRegistration.find();
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
