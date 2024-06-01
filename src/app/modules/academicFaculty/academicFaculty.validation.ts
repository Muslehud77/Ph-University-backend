import { z } from "zod";

export const academicFacultyValidation = z.object({
    body:z.object({
        name:z.string()
    })
})
