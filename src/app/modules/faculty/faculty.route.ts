import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import { facultyController } from './faculty.controller';
import Auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/',Auth(USER_ROLE.admin,USER_ROLE.faculty), facultyController.getAllFaculties);
router.get('/:id', Auth(), facultyController.getFacultyById);
router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyController.updateFaculty,
);
router.delete('/:id', facultyController.deleteFaculty);

export const facultyRoutes = router;
