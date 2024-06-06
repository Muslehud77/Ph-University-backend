import express from 'express';
import { userController } from './user.controller';

import { studentValidations } from '../student/student.zodValidation';

import validateRequest from '../../middlewares/validateRequest';
import { adminValidations } from '../admin/admin.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);
router.post('/create-faculty');
router.post('/create-admin',validateRequest(adminValidations.createAdminValidationSchema),userController.createAdmin);

export const userRoutes = router;
