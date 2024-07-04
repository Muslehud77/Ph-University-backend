import express from 'express';
import { userController } from './user.controller';

import { studentValidations } from '../student/student.zodValidation';

import validateRequest from '../../middlewares/validateRequest';
import { adminValidations } from '../admin/admin.validation';
import { facultyValidations } from '../faculty/faculty.validation';
import Auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';
import { parseJsonBody } from '../../middlewares/parseJsonBody';
const router = express.Router();

router.post(
  '/create-student',
  Auth(USER_ROLE.admin),
  upload.single('file'),
  parseJsonBody(),
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-faculty',
  Auth(USER_ROLE.admin),
  upload.single('file'),
  parseJsonBody(),
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);
router.post(
  '/create-admin',
  // Auth(USER_ROLE.admin),
  upload.single('file'),
  parseJsonBody(),
  validateRequest(adminValidations.createAdminValidationSchema),
  userController.createAdmin,
);
router.post(
  '/change-status/:id',
  Auth(USER_ROLE.admin),
  validateRequest(userValidation.changeStatusValidationSchema),
  userController.changeStatus,
);
router.get(
  '/me',
  Auth('student','faculty','admin'),
  
  userController.getMe,
);

export const userRoutes = router;
