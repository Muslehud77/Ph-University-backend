import mongoose, { MongooseError } from "mongoose";
import { TErrorSource } from "../interface/error";

const handleMongooseError = (err:mongoose.Error.ValidationError) => {
//   const error = err?.errors?.name;
//   const message = error?.message;
//   const errorSource: TErrorSource = [{
//     path: error?.path ,
//     message: error?.message,
//   }];


const message = "Validation error"

const errorSource : TErrorSource = Object.values(err.errors).map((value:mongoose.Error.ValidatorError | mongoose.Error.CastError)=>{
    return {
        path:value?.path,
        message:value?.message
    }
}) 



  const statusCode = 400;
  return {
    statusCode,
    message,
    errorSource,
  };
};


export default handleMongooseError