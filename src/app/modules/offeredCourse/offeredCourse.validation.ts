import { z } from 'zod';



const createOfferedCourseValidation = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    // academicSemester: z.string(), // it wont come from frontend
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(
      z.enum([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]),
    ),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

const updateOfferedCourseValidation = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.enum([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});


export const offeredCourseValidations = {
  createOfferedCourseValidation,
  updateOfferedCourseValidation
};
