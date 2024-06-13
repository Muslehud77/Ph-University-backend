import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const requiredString = { type: String, required: true };

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { ...requiredString, unique: true },
    password: { ...requiredString, select: 0 },
    isPasswordNeedsChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: { values: ['student', 'admin', 'faculty'] },
      required: true,
    },
    status: {
      type: String,
      enum: { values: ['in-progress', 'blocked', 'faculty'] },
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  const isUserExistsByCustomId = await userModel.findOne({ id }).select("+password");
  if (!isUserExistsByCustomId) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists!');
  }

  return isUserExistsByCustomId;
};

userSchema.statics.isUserHasAccess = async function (id: string) {
  const isUserHasAccess = await userModel.findOne({ id }).select("+password");
  if (!isUserHasAccess) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists!');
  }

  //check if the user is deleted
  if (isUserHasAccess.isDeleted !== false) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!');
  }

  //check if the user is blocked
  if (isUserHasAccess.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  return isUserHasAccess;
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  const isPasswordMatched = await bcrypt.compare(
    plainTextPassword,
    hashedPassword,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Wrong Password!');
  }
  return isPasswordMatched;
};

//pre save middleware/hook : will work on create() save() method
userSchema.pre('save', async function () {
  //hashing password and save into DB
  const user = this as TUser;
  const encryptedPassword = await bcrypt.hash(
    user.password,
    config.hashSaltRounds,
  );

  user.password = encryptedPassword;
});

//post save middleware/hook
userSchema.post('save', function (doc, next) {
  // console.log(this, 'post hook : we saved our data');

  doc.password = '';

  next();
});

export const userModel = model<TUser, UserModel>('User', userSchema);
