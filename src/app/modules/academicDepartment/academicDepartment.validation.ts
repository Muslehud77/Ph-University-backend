import { z } from 'zod';

const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string(),
    academicFaculty: z.string(),
  }),
});
const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const academicDepartmentValidation = {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
};
