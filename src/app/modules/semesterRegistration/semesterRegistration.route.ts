import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  Auth('super-admin', 'admin'),
  validateRequest(
    semesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  '/',
  Auth('super-admin', 'admin', 'student', 'faculty'),
  semesterRegistrationControllers.getAllSemesterRegistration,
);
router.get(
  '/:id',
  Auth('super-admin', 'admin', 'student', 'faculty'),
  semesterRegistrationControllers.getSemesterRegistrationById,
);
router.delete(
  '/:id',
  Auth('super-admin', 'admin'),
  semesterRegistrationControllers.deleteSemesterRegistration,
);
router.patch(
  '/:id',
  Auth('super-admin', 'admin'),
  validateRequest(
    semesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistrationById,
);

export const semesterRegistrationRoutes = router;
