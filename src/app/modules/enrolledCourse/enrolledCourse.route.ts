import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { enrolledCourseValidation } from './enrolledCourse.validation';
import { enrolledCourseController } from './enrolledCourse.controller';
import Auth from '../../middlewares/auth';



const router = express.Router();

router.post(
  '/',
  Auth('student'),
 validateRequest(enrolledCourseValidation.createEnrolledCourseValidationSchema),
 enrolledCourseController.createEnrolledCourse
);


export const enrolledCourseRouter = router