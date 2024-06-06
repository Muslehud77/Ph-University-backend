import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorHandler, TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import { MongooseError } from 'mongoose';
import handleMongooseError from '../errors/handleMongooseValidationError';
import { handleMongooseCastError } from '../errors/handleMongooseCastError';
import { handleMongooseDuplicateData } from '../errors/handleMongooseDuplicateDataError';
import AppError from '../errors/AppError';
import { handleMongooseFieldError } from '../errors/handleMongooseFieldError';

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

  const handleError = (errorHandler: TErrorHandler) => {
    const simplifiedError = errorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  };

  if (err instanceof ZodError) {
    handleError(handleZodError);
  } else if (err?.name === 'ValidationError') {
    handleError(handleMongooseError);
  } else if (err?.name === 'CastError') {
    handleError(handleMongooseCastError);
  } else if (err?.code === 11000) {
    handleError(handleMongooseDuplicateData);
  } else if (err?.code === 31254) {
    handleError(handleMongooseFieldError);
  
  } else if (err instanceof AppError || err instanceof Error) {
    statusCode = err instanceof AppError && err?.statusCode;
    message = err?.message;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }



   return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};













/*

*pattern 

success
message
errorSource:[
  path:'',
  message:''
]
stack:



*mongoose validation err

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


    *mongoose cast error

     "err": {
        "stringValue": "\"{ _id: 'wsdjkhgfh' }\"",
        "valueType": "Object",
        "kind": "ObjectId",
        "value": {
            "_id": "wsdjkhgfh"
        },
        "path": "_id",
        "reason": {},
        "name": "CastError",
        "message": "Cast to ObjectId failed for value \"{ _id: 'wsdjkhgfh' }\" (type Object) at path \"_id\" for model \"AcademicDepartment\""
    },


    *mongoose duplicate data error

    "err": {
        "errorResponse": {
            "index": 0,
            "code": 11000,
            "errmsg": "E11000 duplicate key error collection: PH-UNIVERSITY.academicdepartments index: name_1 dup key: { name: \"Electrical\" }",
            "keyPattern": {
                "name": 1
            },
            "keyValue": {
                "name": "Electrical"
            }
        },
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "name": 1
        },
        "keyValue": {
            "name": "Electrical"
        }
    },


     *mongoose field data error

{
    "err": {
        "errorResponse": {
            "ok": 0,
            "errmsg": "Cannot do exclusion on field age in inclusion projection",
            "code": 31254,
            "codeName": "Location31254",
            "$clusterTime": {
                "clusterTime": {
                    "$timestamp": "7377263615495110690"
                },
                "signature": {
                    "hash": "3HXn7LtnOCb6MCEQWVyaY5wn7v8=",
                    "keyId": {
                        "low": 15,
                        "high": 1706645949,
                        "unsigned": false
                    }
                }
            },
            "operationTime": {
                "$timestamp": "7377263615495110690"
            }
        },
        "ok": 0,
        "code": 31254,
        "codeName": "Location31254",
        "$clusterTime": {
            "clusterTime": {
                "$timestamp": "7377263615495110690"
            },
            "signature": {
                "hash": "3HXn7LtnOCb6MCEQWVyaY5wn7v8=",
                "keyId": {
                    "low": 15,
                    "high": 1706645949,
                    "unsigned": false
                }
            }
        },
        "operationTime": {
            "$timestamp": "7377263615495110690"
        }
    }
}


*/
