import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (
  academicDepartment: TAcademicDepartment,
) => {

  const result = await AcademicDepartment.create(academicDepartment);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getAcademicDepartmentByIdFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id }).populate(
    'academicFaculty',
  )
  return result;
};

const updateAcademicDepartmentInDB = async (
  id: string,
  academicDepartment: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    academicDepartment,
  );
  return result;
};

export const academicDepartmentServices = {
  updateAcademicDepartmentInDB,
  getAcademicDepartmentByIdFromDB,
  getAllAcademicDepartmentsFromDB,
  createAcademicDepartmentIntoDB,
};
