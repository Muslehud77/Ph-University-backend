import mongoose from 'mongoose';
import {
  TErrorSource,
  TSimplifiedError,
} from '../interfaceSchemaValidation/error';

export const handleMongooseDuplicateData = (err: any): TSimplifiedError => {
  const statusCode = 400;
  const pathRegex = /dup key: { (.+?): "([^"]+)" }/;
  const match =
    err?.errorResponse?.errmsg?.match(pathRegex) ||
    err?.message?.match(pathRegex);

 

  const errorSource: TErrorSource = [
    {
      path: match ? `${match[1]} : ${match[2]}` : '',
      message: err?.errorResponse?.errmsg || err?.message,
    },
  ];

  return {
    statusCode,
    message: 'Duplicate',
    errorSource,
  };
};
