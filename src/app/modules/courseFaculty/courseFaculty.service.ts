
import { TCourseFaculty } from './courseFaculty.interface';
import { CourseFaculty } from './courseFaculty.model';

const createCourseFacultyToDB = async (courseFaculty: TCourseFaculty) => {
  const result = await CourseFaculty.create(courseFaculty);
  return result;
};

const findCourseFacultyByIdFromDB = async (id: string) => {
  const result = await CourseFaculty.findById({ _id: id });
  return result;
};

const findAllCourseFacultyFromDB = async () => {
  const result = await CourseFaculty.find();
  return result;
};

const updateCourseFacultyInDB = async (
  id: string,
  courseFaculty: TCourseFaculty,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    { _id: id },
    courseFaculty,
    { new: true },
  );

  return result;
};

export const courseFacultyServices = {
  createCourseFacultyToDB,
  findCourseFacultyByIdFromDB,
  findAllCourseFacultyFromDB,
  updateCourseFacultyInDB,
};
