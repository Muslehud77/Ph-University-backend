import { Schema, model } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const offeredCourseSchema = new Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'SemesterRegistration',
  },
  academicSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
  academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
  maxCapacity: { type: Number, required: true },
  section: { type: Number, required: true },
  days: [{ type: String, enum: days }],
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

export const OfferedCourse = model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
