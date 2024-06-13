import { Schema, model } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';
import { TCourseFaculty } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true },
  prefix: { type: String, required: true },
  code: { type: Number, required: true },
  credits: { type: Number, required: true },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: { type: Boolean, default: false },
});

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
  faculties: [{ type: Schema.Types.ObjectId, ref: 'Faculty' }],
});

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);

export const Course = model<TCourse>('Course', courseSchema);
