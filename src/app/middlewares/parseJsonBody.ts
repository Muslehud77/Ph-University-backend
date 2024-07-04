import { NextFunction, Request, Response } from "express";

export const parseJsonBody = ()=>{
    return (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    };
};