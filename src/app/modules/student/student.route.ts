import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.zodValidation';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', studentControllers.getAllStudent);
router.get('/:id',Auth("admin","faculty","student"), studentControllers.getStudentByID);
router.delete('/:id', studentControllers.deleteStudent);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidation),
  studentControllers.updateStudent,
);

export const studentRoutes = router;
