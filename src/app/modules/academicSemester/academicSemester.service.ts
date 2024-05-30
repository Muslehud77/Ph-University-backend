import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemesterToDB = async (semester: TAcademicSemester) => {
  const result = await AcademicSemester.create(semester);
  return result;
};

export const academicSemesterServices = {
  createSemesterToDB,
};
