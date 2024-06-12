import { z } from 'zod';

const timeStringSchema = z.string().refine(
  time => {
    const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return timeRegex.test(time);
  },
  {
    message: "Invalid time format, expected 'HH:MM' in 24 hours format ",
  },
);

const createOfferedCourseValidation = z.object({
  body: z
    .object({
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
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      body => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      { message: 'End time should start before end time' },
    ),
});

const updateOfferedCourseValidation = z.object({
  body: z
    .object({
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
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      body => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      { message: 'End time should start before end time' },
    ),
});

export const offeredCourseValidations = {
  createOfferedCourseValidation,
  updateOfferedCourseValidation,
};
