import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (
  academicFaculty: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.create(academicFaculty);
  return result;
};

const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
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
