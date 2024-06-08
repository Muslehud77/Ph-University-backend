import { z } from 'zod';

const preRequisiteCoursesValidation = z.object({
    course:z.string(),
    isDeleted:z.boolean().optional()
})


const createCourseValidation = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(preRequisiteCoursesValidation).optional(),
    isDeleted: z.boolean().optional(),
  }),
});


const updateCourseValidation = createCourseValidation.deepPartial()

export const courseValidation = {
    createCourseValidation,
    updateCourseValidation
}