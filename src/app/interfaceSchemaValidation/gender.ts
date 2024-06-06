import { z } from 'zod';

export const genderValidationSchema = z.enum(['male', 'female', 'others'], {
  message: "The gender field can only be 'male', 'female' or 'other'",
});
