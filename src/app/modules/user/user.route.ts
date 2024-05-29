import express from 'express';
import { userController } from './user.controller';

import { studentValidations } from '../student/student.zodValidation';

import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);
router.post('/create-faculty');
router.post('/create-admin');

export const userRoutes = router;
