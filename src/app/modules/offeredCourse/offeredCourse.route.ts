import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { offeredCourseController } from './offeredCourse.controller';
import { offeredCourseValidations } from './offeredCourse.validation';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  Auth('super-admin', 'admin', 'faculty'),
  offeredCourseController.getAllOfferedCourses,
);
router.get(
  '/my-offered-courses',
  Auth('student'),
  offeredCourseController.getMyOfferedCourse,
);
router.get(
  '/:id',
  Auth('super-admin', 'admin', 'student', 'faculty'),
  offeredCourseController.getOfferedCourseById,
);
router.delete(
  '/:id',
  Auth('super-admin', 'admin'),
  offeredCourseController.deleteSemesterRegistration,
);
router.patch(
  '/:id',
  Auth('super-admin', 'admin', 'student', 'faculty'),
  validateRequest(offeredCourseValidations.updateOfferedCourseValidation),
  offeredCourseController.updateOfferedCourse,
);
router.post(
  '/',
  Auth('super-admin', 'admin'),
  validateRequest(offeredCourseValidations.createOfferedCourseValidation),
  offeredCourseController.createOfferedCourse,
);



export const offeredCourseRoutes = router;
