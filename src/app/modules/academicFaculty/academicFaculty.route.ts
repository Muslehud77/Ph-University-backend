import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyControllers } from './academicFaculty.controller';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  Auth('super-admin','admin'),
  validateRequest(academicFacultyValidation),
  academicFacultyControllers.createAcademicFaculty,
);
router.get('/', academicFacultyControllers.getAllAcademicFaculty);
router.get('/:id', academicFacultyControllers.getAcademicFacultyById);
router.patch(
  '/:id',
  validateRequest(academicFacultyValidation),
  academicFacultyControllers.updateAcademicFacultyById,
);

export const academicFacultyRoutes = router;
