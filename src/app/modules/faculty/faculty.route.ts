import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import { facultyController } from './faculty.controller';
import Auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  Auth(USER_ROLE['super-admin'], USER_ROLE.admin, USER_ROLE.faculty),
  facultyController.getAllFaculties,
);
router.get('/:id',  Auth(USER_ROLE['super-admin'], USER_ROLE.admin, USER_ROLE.faculty), facultyController.getFacultyById);
router.patch(
  '/:id',
  Auth(USER_ROLE['super-admin'], USER_ROLE.admin),
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyController.updateFaculty,
);
router.delete('/:id',  Auth(USER_ROLE['super-admin'], USER_ROLE.admin),facultyController.deleteFaculty);

export const facultyRoutes = router;
