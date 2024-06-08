import { z } from 'zod';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(['upcoming', 'ongoing', 'ended']).default('upcoming'),
    startDate: z.string(),
    endDate: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

const updateSemesterRegistrationValidationSchema = createSemesterRegistrationValidationSchema.deepPartial()

export const semesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
