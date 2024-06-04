import mongoose from "mongoose";
import { TErrorSource, TSimplifiedError } from "../interface/error";

export const handleMongooseCastError = (err:mongoose.Error.CastError) :TSimplifiedError =>{
    const message = "Invalid ID"
    
    const errorSource: TErrorSource = [
      {
        path: err?.path,
        message: err?.message,
      },
    ];
    const statusCode = 400;
    return {
      statusCode,
      message,
      errorSource,
    };
}