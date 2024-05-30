import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicCodes,
  AcademicMonths,
  AcademicNames,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: { values: AcademicNames },
      required: true,
    },
    year: { type: Date, required: true },
    code: { type: String, enum: { values: AcademicCodes }, required: true },
    startMonth: { type: String, enum: AcademicMonths, required: true },
    endMonth: { type: String, enum: AcademicMonths, required: true },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
