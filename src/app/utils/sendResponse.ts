import { Response } from 'express';
import AppError from '../errors/AppError';

type TData<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TData<T>) => {
 if (!Object.keys(data).length) {
   throw new AppError(404, 'Not Found!');
 }
  res.status(data.statusCode).json({
    success: data.success,
    message: data?.message || 'Request Successful',
    data: data.data,
  });
};

export default sendResponse