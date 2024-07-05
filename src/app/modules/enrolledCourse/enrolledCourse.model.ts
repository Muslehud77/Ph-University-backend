import { Schema, model } from 'mongoose';
import { TCourseMarks, TEnrolledCourse } from './enrolledCourse.interface';

const courseMarksSchema = new Schema<TCourseMarks>({
  classTest1: { type: Number, min: 0, max: 10, default: 0 },
  midTerm: { type: Number, min: 0, max: 30, default: 0 },
  classTest2: { type: Number, min: 0, max: 10, default: 0 },
  finalTerm: { type: Number, min: 0, max: 50, default: 0 },
});

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'SemesterRegistration',
  },
  academicSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicFaculty',
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'OfferedCourse',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicDepartment',
  },
  course: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
  faculty: { type: Schema.Types.ObjectId, required: true, ref: 'Faculty' },
  student: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
  isEnrolled: { type: Boolean, default: false },
  courseMarks: { type: courseMarksSchema ,default:{}},
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B', 'B-', 'C', 'D', 'F', 'N/A'],
    default: 'N/A',
  },
  gradePoints: { type: Number, min: 0, max: 4, default: 0 },
  isCompleted: { type: Boolean, default: false },
});

export const EnrolledCourse = model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);
