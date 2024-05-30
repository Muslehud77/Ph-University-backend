import { z } from 'zod';
import { AcademicCodes, AcademicMonths, AcademicNames } from './academicSemester.constant';




const academicSemesterValidation = z.object({
  body: z.object({
    name: z.enum(AcademicNames as [string, ...string[]]),
    year: z.string().trim(),
    code: z.enum(AcademicCodes as [string, ...string[]]),
    startMonth: z.enum(AcademicMonths as [string, ...string[]]),
    endMonth: z.enum(AcademicMonths as [string, ...string[]]),
  }),
});


export default academicSemesterValidation