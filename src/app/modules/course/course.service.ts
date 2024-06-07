import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFieldsForCourse } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (courseData: TCourse) => {
  const result = await Course.create(courseData);
  return result;
};

const getAllCorsesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
    .search(searchableFieldsForCourse)
    .filter()
    .sort()
    .paginate()
    .fieldQuery();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseByIdFromDB = async (id: string) => {
  const result = await Course.findById({ _id: id });
  return result;
};

const deleteSingleCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateSingleCourseInDB = async (
  id: string,
  courseData: Partial<TCourse>,
) => {
  const result = await Course.findByIdAndUpdate({ _id: id }, courseData, {
    new: true,
  });
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCorsesFromDB,
  getSingleCourseByIdFromDB,
  deleteSingleCourseFromDB,
  updateSingleCourseInDB,
};
