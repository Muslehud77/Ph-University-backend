import mongoose from 'mongoose';
import { TErrorSource, TSimplifiedError } from '../interface/error';

export const handleMongooseFieldError = (
  err: any,
): TSimplifiedError => {
  const message = 'Invalid Field';

  const errorSource: TErrorSource = [
    {
      path: "",
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message,
    errorSource,
  };
};
