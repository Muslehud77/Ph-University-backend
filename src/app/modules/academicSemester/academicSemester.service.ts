import QueryBuilder from '../../builder/QueryBuilder';
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

const findAllSemestersFromDB = async (query : Record<string,unknown>) => {


  const semesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(["name","year"])
    .filter()
    .sort()
    .paginate()
    .fieldQuery();


const result = await semesterQuery.modelQuery;

const meta = await semesterQuery.countTotal();

return { result, meta };
};

const updateSemesterInDB = async (
  id: string,
  semesterData: TAcademicSemester,
) => {
  if (
    semesterData.name &&
    semesterData.code &&
    academicSemesterCodeMapper[semesterData.name] !== semesterData.code
  ) {
    throw new Error("Semester name and code aren't matching");
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    semesterData,
    { new: true },
  );

  return result;
};

export const academicSemesterServices = {
  createSemesterToDB,
  findSemesterByIdFromDB,
  findAllSemestersFromDB,
  updateSemesterInDB,
};
