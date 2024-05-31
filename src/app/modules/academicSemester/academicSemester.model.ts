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
    year: { type: String, required: true },
    code: { type: String, enum: { values: AcademicCodes }, required: true },
    startMonth: { type: String, enum: AcademicMonths, required: true },
    endMonth: { type: String, enum: AcademicMonths, required: true },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error('This semester already exists');
  }

  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
