import express from 'express';
import validateRequest from './../../middlewares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentControllers } from './academicDepartment.controller';
const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentValidation,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);

router.get('/', academicDepartmentControllers.getAllAcademicDepartments);
router.get('/:id', academicDepartmentControllers.getAcademicDepartmentById);

router.patch(
  '/:id',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidation,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
