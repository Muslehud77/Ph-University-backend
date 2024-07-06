import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.zodValidation';
import Auth from '../../middlewares/auth';


const router = express.Router();

router.get('/',Auth("super-admin","admin"), studentControllers.getAllStudent);
router.get('/:id',Auth("super-admin","admin","faculty"), studentControllers.getStudentByID);
router.delete(
  '/:id',
  Auth('super-admin', 'admin'),
  studentControllers.deleteStudent,
);
router.patch(
  '/:id',
  Auth('super-admin', 'admin'),
  validateRequest(studentValidations.updateStudentValidation),
  studentControllers.updateStudent,
);

export const studentRoutes = router;
