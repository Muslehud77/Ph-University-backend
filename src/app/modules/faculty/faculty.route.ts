import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import { facultyController } from './faculty.controller';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', facultyController.getAllFaculties);
router.get('/:id', Auth(), facultyController.getFacultyById);
router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyController.updateFaculty,
);
router.delete('/:id', facultyController.deleteFaculty);

export const facultyRoutes = router;
