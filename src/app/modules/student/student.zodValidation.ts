import { z } from 'zod';
import { userNameValidationSchema } from '../../interfaceSchemaValidation/userName';
import { genderValidationSchema } from '../../interfaceSchemaValidation/gender';
import { emailValidation } from '../../interfaceSchemaValidation/email';

// Define the validation schema for UserName

// Define the validation schema for Guardian
const guardianValidationSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: 'Guardian Name should be at least 5 characters long',
    })
    .trim(),
  occupation: z
    .string()
    .min(1, { message: 'Guardian Occupation is required' })
    .trim(),
  contactNumber: z
    .string()
    .min(1, { message: 'Guardian Contact Number is required' })
    .trim(),
});

// Define the validation schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: 'Local Guardian Name should be at least 5 characters long',
    })
    .trim(),
  occupation: z
    .string()
    .min(1, { message: 'Local Guardian Occupation is required' })
    .trim(),
  contactNumber: z
    .string()
    .min(1, { message: 'Local Guardian Contact Number is required' })
    .trim(),
  address: z
    .string()
    .min(1, { message: 'Local Guardian Address is required' })
    .trim(),
});

// Define the validation schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(5),
    student: z.object({
      name: userNameValidationSchema,
      gender: genderValidationSchema,
      dateOfBirth: z.string().trim().optional(),
      email: emailValidation,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      contactNumber: z
        .string()
        .min(1, { message: 'Contact Number is required' })
        .trim(),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency Contact Number is required' })
        .trim(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present Address is required' })
        .trim(),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent Address is required' })
        .trim(),
      guardian: z.object({
        father: guardianValidationSchema,
        mother: guardianValidationSchema,
      }),
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().trim().optional(),
    }),
  }),
});

const updateStudentValidation = createStudentValidationSchema.deepPartial();

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidation,
};
