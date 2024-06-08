import { z } from "zod";

const createCourseFacultyValidationSchema = z.object({
    body:z.object({
        course: z.string(),
        faculties: z.array(z.string()).optional()
    })
})

export const courseFacultyValidation = {
  createCourseFacultyValidationSchema
};