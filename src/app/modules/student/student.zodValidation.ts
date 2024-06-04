import { z } from 'zod';

// Define the validation schema for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(5, { message: 'First Name is required' })
    .trim()
    .refine(
      value =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      {
        message: 'First Name must be capitalized',
      },
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .min(5, { message: 'Last Name is required' })
    .trim()
    .regex(/^[a-zA-Z]+$/, {
      message: 'Last Name should only contain alphabetic characters',
    }),
});

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
      gender: z.enum(['male', 'female', 'others'], {
        message: "The gender field can only be 'male', 'female' or 'other'",
      }),
      dateOfBirth: z.string().trim().optional(),
      email: z
        .string()
        .min(1, { message: 'Email is required' })
        .trim()
        .email({ message: 'Invalid email format' }),
        admissionSemester:z.string(),
        academicDepartment:z.string(),
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


const updateStudentValidation = createStudentValidationSchema.deepPartial()

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidation,
};
