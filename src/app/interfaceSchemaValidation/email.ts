import validator from "validator"
import { z } from "zod"

export const emailValidation = z
        .string()
        .min(1, { message: 'Email is required' })
        .trim()
        .email({ message: 'Invalid email format' })

export const emailSchema =  {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    }        