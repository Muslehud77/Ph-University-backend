import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import { facultyController } from './faculty.controller';

const router = express.Router();

router.get('/', facultyController.getAllFaculties);
router.get('/:id', facultyController.getFacultyById);
router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyController.updateFaculty,
);
router.delete('/:id', facultyController.deleteFaculty);

export const facultyRoutes = router;
