import { Model, Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String , unique:true,required:true
    },
  },
  { timestamps: true },
);


academicFacultySchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicFaculty.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new Error('Department Already Exists');
  }
  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExists = await AcademicFaculty.findOne(query);
  if (!isDepartmentExists) {
    throw new Error("Department Doesn't Exists");
  }
  next();
});



export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
