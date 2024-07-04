import { z } from 'zod';

const userValidationSchema = z.object({
  // id: z.string().min(1),
  password: z
    .string({ invalid_type_error: 'password must be a string' })
    .min(6, { message: 'Password must be at least 6 characters' }),

  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status : z.enum(['in-progress','blocked'])
  })
})

export const userValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
