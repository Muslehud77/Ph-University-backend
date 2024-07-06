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
router.get('/',  Auth('super-admin', 'admin','student','faculty'),AcademicSemesterControllers.findAllSemestersFromDB);
router.get(
  '/:id',
  Auth('super-admin', 'admin', 'student', 'faculty'),
  AcademicSemesterControllers.findSemesterById,
);
router.patch(
  '/:id',
  Auth('super-admin', 'admin'),
  validateRequest(updateAcademicSemesterValidation),
  AcademicSemesterControllers.updateSemester,
);

export const semesterRoutes = router;
