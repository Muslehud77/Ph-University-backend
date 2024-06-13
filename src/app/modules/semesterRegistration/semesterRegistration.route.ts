import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import { semesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(
    semesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get('/', semesterRegistrationControllers.getAllSemesterRegistration);
router.get('/:id', semesterRegistrationControllers.getSemesterRegistrationById);
router.delete(
  '/:id',
  semesterRegistrationControllers.deleteSemesterRegistration,
);
router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistrationById,
);

export const semesterRegistrationRoutes = router;
