import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (
  academicDepartment: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.create(academicDepartment);
  return result;
};

const getAllAcademicDepartmentsFromDB = async (
  query: Record<string, unknown>,
) => {
  const facultyQuery = new QueryBuilder(
    AcademicDepartment.find().populate('academicFaculty'),
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

const getAcademicDepartmentByIdFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id }).populate(
    'academicFaculty',
  );
  return result;
};

const updateAcademicDepartmentInDB = async (
  id: string,
  academicDepartment: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    academicDepartment,
    { new: true },
  );
  return result;
};

export const academicDepartmentServices = {
  updateAcademicDepartmentInDB,
  getAcademicDepartmentByIdFromDB,
  getAllAcademicDepartmentsFromDB,
  createAcademicDepartmentIntoDB,
};
