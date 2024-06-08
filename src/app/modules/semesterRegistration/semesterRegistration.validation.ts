import { z } from 'zod';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).default('UPCOMING'),
    startDate: z.string(),
    endDate: z.string(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

const updateSemesterRegistrationValidationSchema =
  createSemesterRegistrationValidationSchema.deepPartial();

export const semesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
