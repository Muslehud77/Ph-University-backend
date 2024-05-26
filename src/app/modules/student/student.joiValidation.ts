import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string().min(15).required().trim(),
  middleName: Joi.string().allow('').trim(),
  lastName: Joi.string().min(5).required().trim(),
});

// Define the schema for the guardian
const guardianSchema = Joi.object({
  name: Joi.string().min(5).required().trim(),
  occupation: Joi.string().required().trim(),
  contactNumber: Joi.string().required().trim(),
});

// Define the schema for the local guardian
const localGuardianSchema = Joi.object({
  name: Joi.string().min(5).required().trim(),
  occupation: Joi.string().required().trim(),
  contactNumber: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
});

// Define the rest of the student schema
export const JoiStudentValidationSchema = Joi.object({
  id: Joi.string().trim(),
  name: userNameSchema,
  gender: Joi.string().valid('male', 'female', 'others').required().trim(),
  dateOfBirth: Joi.string().allow('').trim(),
  email: Joi.string().email().required().trim(),
  contactNumber: Joi.string().required().trim(),
  emergencyContactNo: Joi.string().required().trim(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .allow('')
    .trim(),
  presentAddress: Joi.string().required().trim(),
  permanentAddress: Joi.string().required().trim(),
  guardian: Joi.object({
    father: guardianSchema.required(),
    mother: guardianSchema.required(),
  }).required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string().allow('').trim(),
  isActive: Joi.string().valid('active', 'inactive').default('active').trim(),
});
