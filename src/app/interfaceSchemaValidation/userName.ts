import { Schema } from 'mongoose';
import { z } from 'zod';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

// Define the schema for the user name
export const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
});

export const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'First name should at-least be three characters' })
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
    .min(3, { message: 'Last name should at-least be three characters' })
    .trim()
    .regex(/^[a-zA-Z]+$/, {
      message: 'Last Name should only contain alphabetic characters',
    }),
});
