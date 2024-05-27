import { Request, Response } from 'express';

import { userServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    //* data validation using Joi
    const { password,studentData } = req.body

    //* data validation using Zod
    // const student = await zodStudentValidationSchema.parseAsync(
    //   req.body.student,
    // );

    // will call service func to send this data
    const result = await userServices.createStudentIntoDB(password,studentData);
    // send response

    res.status(200).json({
      success: true,
      message: 'Student is Created Successfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: 'Could not complete the request',
      data: err.message,
    });
  }
};
