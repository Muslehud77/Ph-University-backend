import { ZodError, ZodIssue } from 'zod';
import { TSimplifiedError } from '../interfaceSchemaValidation/error';

const handleZodError = (err: ZodError): TSimplifiedError => {
  const errorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};

export default handleZodError;
