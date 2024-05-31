import { academicSemesterCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemesterToDB = async (semester: TAcademicSemester) => {
  if (academicSemesterCodeMapper[semester.name] !== semester.code) {
    throw new Error("Semester name and code aren't matching");
  }

  const result = await AcademicSemester.create(semester);
  return result;
};

const findSemesterByIdFromDB = async (id: string) => {
  const result = await AcademicSemester.findById({ _id: id });
  return result;
};

const findAllSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const updateSemesterInDB = async (
  id: string,
  semesterData: TAcademicSemester,
) => {
  const result = await AcademicSemester.updateOne({ _id: id }, semesterData);
  return result;
};

export const academicSemesterServices = {
  createSemesterToDB,
  findSemesterByIdFromDB,
  findAllSemestersFromDB,
  updateSemesterInDB,
};
