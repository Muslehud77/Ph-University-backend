import express from 'express';
import validateRequest from './../../middlewares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentControllers } from './academicDepartment.controller';
import Auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-academic-department',
  Auth('super-admin','admin'),
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentValidation,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);

router.get(
  '/',
  Auth('super-admin', 'admin', 'student', 'faculty'),
  academicDepartmentControllers.getAllAcademicDepartments,
);
router.get(
  '/:id',
  Auth('super-admin', 'admin', 'student', 'faculty'),
  academicDepartmentControllers.getAcademicDepartmentById,
);

router.patch(
  '/:id',
  Auth('super-admin', 'admin'),
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidation,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
