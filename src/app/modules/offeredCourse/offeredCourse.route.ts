import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { offeredCourseController } from './offeredCourse.controller';
import { offeredCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router.get('/', offeredCourseController.getAllOfferedCourses);
router.get('/:id', offeredCourseController.getOfferedCourseById);
router.delete('/:id', offeredCourseController.deleteSemesterRegistration);
router.patch(
  '/:id',
  validateRequest(offeredCourseValidations.updateOfferedCourseValidation),
  offeredCourseController.updateOfferedCourse,
);
router.post(
  '/',
  validateRequest(offeredCourseValidations.createOfferedCourseValidation),
  offeredCourseController.createOfferedCourse,
);

export const offeredCourseRoutes = router;
