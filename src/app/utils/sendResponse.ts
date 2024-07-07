import { Response } from 'express';
import AppError from '../errors/AppError';

export type TMeta ={
    total: number;
    pageNumber: number;
    limitDataCount: number;
    totalPage: number;
  }

type TData<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TData<T>) => {
  if (!Object.keys(data).length) {
    throw new AppError(404, 'Not Found!');
  }
  res.status(data.statusCode).json({
    success: data.success,
    message: data?.message || 'Request Successful',
    meta: data?.meta || {},
    data: data.data,
  });
};

export default sendResponse;
