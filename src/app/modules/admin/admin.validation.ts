import { z } from 'zod';
import { userNameValidationSchema } from '../../interfaceSchemaValidation/userName';
import { genderValidationSchema } from '../../interfaceSchemaValidation/gender';

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().min(5).optional(),
    admin: z.object({
      user: z.string().optional(),
   
      designation: z.string(),
      name: userNameValidationSchema,
      gender: genderValidationSchema,
      email: z.string(),
      contactNumber: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

const updateAdminValidationSchema = createAdminValidationSchema.deepPartial();

export const adminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
