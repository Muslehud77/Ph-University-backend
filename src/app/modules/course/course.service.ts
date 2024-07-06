import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFieldsForCourse } from './course.constant';
import {
  TCourse,
  TCourseFaculty,
 
} from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (courseData: TCourse) => {
  const result = await Course.create(courseData);
  return result;
};

const getAllCorsesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(searchableFieldsForCourse)
    .filter()
    .sort()
    .paginate()
    .fieldQuery();
  const result = await courseQuery.modelQuery;
  
   const meta = await courseQuery.countTotal();

   return { result, meta };
};

const getSingleCourseByIdFromDB = async (id: string) => {
  const result = await Course.findById({ _id: id }).populate(
    'preRequisiteCourses.course',
  );
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
  const { preRequisiteCourses, ...courseRemainingData } = courseData;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      { _id: id },
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Could not update the basic course data',
      );
    }

    if (preRequisiteCourses?.length) {
      // filter the deleted fields

      const deletedPreRequisites = preRequisiteCourses
        .filter(el => el?.isDeleted)
        .map(el => el?.course);
      const newPrerequisites = preRequisiteCourses?.filter(
        el => !el?.isDeleted,
      );

      if (deletedPreRequisites?.length) {
        const deletePreRequisitesCourses = await Course.findByIdAndUpdate(
          { _id: id },
          {
            $pull: {
              preRequisiteCourses: { course: { $in: deletedPreRequisites } },
            },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        );
        if (!deletePreRequisitesCourses) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            'Could not delete Pre Requisite Courses',
          );
        }
      }
      if (newPrerequisites?.length) {
        const newPrerequisiteCourses = await Course.findByIdAndUpdate(
          { _id: id },
          {
            $addToSet: { preRequisiteCourses: { $each: newPrerequisites } },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        );
        if (!newPrerequisiteCourses) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            'Could not add new PreRequisite Courses',
          );
        }
      }
    }

    const result = await Course.findById({ _id: id }).populate(
      'preRequisiteCourses.course',
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.BAD_REQUEST,
      err?.message || 'Could not update course',
    );
  }
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  assignFaculties: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: assignFaculties } },
    },
    {
      upsert: true,
      new: true,
    },
  );

  return result;
};

const deleteFacultiesFromCourseFromDB = async (
  id: string,
  facultiesToRemove: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: facultiesToRemove } },
    },
    {
      new: true,
    },
  );

  return result;
};

const getFacultiesForASingleCourseFromDB = async (id:string)=>{
const result = await CourseFaculty.findOne({course:id}).populate('faculties').select('faculties')
return result
}

export const courseServices = {
  createCourseIntoDB,
  getAllCorsesFromDB,
  getSingleCourseByIdFromDB,
  deleteSingleCourseFromDB,
  updateSingleCourseInDB,
  assignFacultiesWithCourseIntoDB,
  deleteFacultiesFromCourseFromDB,
  getFacultiesForASingleCourseFromDB,
};
