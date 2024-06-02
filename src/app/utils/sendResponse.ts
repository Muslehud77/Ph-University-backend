import { Response } from 'express';

type TData<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TData<T>) => {
 if(!data.data){
  throw new Error("Not Found!")
 }
  res.status(data.statusCode).json({
    success: data.success,
    message: data?.message || 'Request Successful',
    data: data.data,
  });
};

export default sendResponse