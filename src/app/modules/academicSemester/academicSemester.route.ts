import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { AcademicSemesterControllers } from './academicSemester.controller';
import {
  academicSemesterValidation,
  updateAcademicSemesterValidation,
} from './academicSemester.validation';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-semester',
  Auth('super-admin','admin'),
  validateRequest(academicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get('/', AcademicSemesterControllers.findAllSemestersFromDB);
router.get('/:id', AcademicSemesterControllers.findSemesterById);
router.patch(
  '/:id',
  validateRequest(updateAcademicSemesterValidation),
  AcademicSemesterControllers.updateSemester,
);

export const semesterRoutes = router;
