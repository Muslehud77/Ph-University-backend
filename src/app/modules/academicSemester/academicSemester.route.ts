import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { AcademicSemesterControllers } from './academicSemester.controller';
import {
  academicSemesterValidation,
  updateAcademicSemesterValidation,
} from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
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
