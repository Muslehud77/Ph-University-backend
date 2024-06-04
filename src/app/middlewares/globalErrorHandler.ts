import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, THandleError } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import { MongooseError } from 'mongoose';
import handleMongooseError from '../errors/handleMongooseError';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';



  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ];

  const handleError = (errorHandler:any)=>{
    const simplifiedError = errorHandler(err)
  statusCode = simplifiedError?.statusCode;
  message = simplifiedError?.message;
  errorSource = simplifiedError?.errorSource;
  }


  if (err instanceof ZodError) {
    handleError(handleZodError);
  
  }else if (err instanceof MongooseError) {
    handleError(handleMongooseError);
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    // err,
    stack: config.node_env === "development" ?  err?.stack : null
  
  });
};

/*

pattern 

success
message
errorSource:[
  path:'',
  message:''
]
stack:



mongoose validation err

 "err": {
        "errors": {
            "name": {
                "name": "ValidatorError",
                "message": "Path `name` is required.",
                "properties": {
                    "message": "Path `name` is required.",
                    "type": "required",
                    "path": "name"
                },
                "kind": "required",
                "path": "name"
            }
        },
        "_message": "AcademicDepartment validation failed",
        "name": "ValidationError",
        "message": "AcademicDepartment validation failed: name: Path `name` is required."
    },


*/
