import express from 'express';
import { userController } from './user.controller';

import { studentValidations } from '../student/student.zodValidation';

import validateRequest from '../../middlewares/validateRequest';
import { adminValidations } from '../admin/admin.validation';
import { facultyValidations } from '../faculty/faculty.validation';
import Auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
const router = express.Router();

router.post(
  '/create-student',Auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-faculty',Auth(USER_ROLE.admin),
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);
router.post(
  '/create-admin',
  // Auth(USER_ROLE.admin),
  validateRequest(adminValidations.createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoutes = router;
