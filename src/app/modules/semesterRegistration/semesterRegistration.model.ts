import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';

const courseFacultySchema = new Schema<TSemesterRegistration>({
  course: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
  faculties: [{ type: Schema.Types.ObjectId, ref: 'Faculty' }],
});

export const CourseFaculty = model<TSemesterRegistration>(
  'CourseFaculty',
  courseFacultySchema,
);
