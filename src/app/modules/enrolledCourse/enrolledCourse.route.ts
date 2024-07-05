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
router.patch(
  '/update-enrolled-course-marks',
  Auth('faculty'),
 validateRequest(enrolledCourseValidation.updateEnrolledCourseMarksValidationSchema),
 enrolledCourseController.updateEnrolledCourse
);


export const enrolledCourseRouter = router