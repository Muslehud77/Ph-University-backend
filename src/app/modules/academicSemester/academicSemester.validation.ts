import { z } from 'zod';
import {
  AcademicCodes,
  AcademicMonths,
  AcademicNames,
} from './academicSemester.constant';

export const academicSemesterValidation = z.object({
  body: z.object({
    name: z.enum(AcademicNames as [string, ...string[]]),
    year: z.string().trim(),
    code: z.enum(AcademicCodes as [string, ...string[]]),
    startMonth: z.enum(AcademicMonths as [string, ...string[]]),
    endMonth: z.enum(AcademicMonths as [string, ...string[]]),
  }),
});
export const updateAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum(AcademicNames as [string, ...string[]]).optional(),
    year: z.string().trim().optional(),
    code: z.enum(AcademicCodes as [string, ...string[]]).optional(),
    startMonth: z.enum(AcademicMonths as [string, ...string[]]).optional(),
    endMonth: z.enum(AcademicMonths as [string, ...string[]]).optional(),
  }),
});
