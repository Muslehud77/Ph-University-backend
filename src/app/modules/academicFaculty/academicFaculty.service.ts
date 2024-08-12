import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (
  academicFaculty: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.create(academicFaculty);
  return result;
};

const getAllAcademicFacultiesFromDB = async (query:Record<string,unknown>) => {
   const facultyQuery = new QueryBuilder(
     AcademicFaculty.find(),
     query,
   )
     .search([])
     .filter()
     .sort()
     .paginate()
     .fieldQuery();

   const result = await facultyQuery.modelQuery;

   const meta = await facultyQuery.countTotal();

   return { result, meta };
 
};

const getAcademicFacultyByIdFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById({ _id: id });
  return result;
};

const updateFacultyByIdFromDB = async (
  id: string,
  data: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const academicFacultyServices = {
  updateFacultyByIdFromDB,
  getAcademicFacultyByIdFromDB,
  getAllAcademicFacultiesFromDB,
  createAcademicFacultyIntoDB,
};
