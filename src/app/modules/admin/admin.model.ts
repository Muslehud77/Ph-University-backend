import { Schema, model } from "mongoose";
import { TAdmin } from "./admin.interface";
import { userNameSchema } from "../../interfaceSchemaValidation/userName";

import validator from "validator";

const adminSchema = new Schema<TAdmin>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  managementDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ManagementDepartment',
  },
  designation: { type: String, required: true },
  name: userNameSchema,
  gender: {
    enum: {
      values: ['male', 'female', 'others'],
      message:
        "{VALUE} is not valid, The gender field can only be 'male', 'female' or 'other'",
    },
    type: String,
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
});


export const Admin = model<TAdmin>('Admin',adminSchema)