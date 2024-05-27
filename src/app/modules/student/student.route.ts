import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();


router.get('/', studentControllers.getAllStudent);
router.get('/:id', studentControllers.getStudentByID);
router.delete('/delete/:id', studentControllers.deleteStudent);

export const studentRoutes = router;
