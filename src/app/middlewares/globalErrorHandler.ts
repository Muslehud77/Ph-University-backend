import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const globalErrorHandler :  ErrorRequestHandler = (err, req, res, next) => {

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  type TErrorSource ={
    path : string | number;
    message: string
  }[]

  let errorSource : TErrorSource = [{
    path: "",
    message : "Something Went Wrong"
  }]


  if(err instanceof ZodError){
    statusCode = 400,
    message = "ami zod error"
  }


  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    data: err,
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


*/