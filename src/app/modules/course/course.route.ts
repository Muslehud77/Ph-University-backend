import express from 'express';
import { courseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import Auth from '../../middlewares/auth';
const router = express.Router();

router.get(
  '/',
  Auth('super-admin', 'admin', 'student', 'faculty'),
  courseController.getAllCorses,
);
router.get(
  '/:id',
  Auth('super-admin', 'admin', 'student', 'faculty'),
  courseController.getCourseById,
);
router.post(
  '/',
  Auth('super-admin', 'admin'),
  validateRequest(courseValidation.createCourseValidation),
  courseController.createCourse,
);
router.patch(
  '/:id',
  Auth('super-admin', 'admin'),
  validateRequest(courseValidation.updateCourseValidation),
  courseController.updateSingleCourse,
);
router.delete(
  '/:id',
  Auth('super-admin', 'admin'),
  courseController.deleteCourse,
);
router.put(
  '/:id/assign-faculties',
  Auth('super-admin', 'admin'),
  validateRequest(courseValidation.courseFacultyValidationSchema),
  courseController.assignFacultiesInCourseFaculties,
);
router.delete(
  '/:id/delete-faculties',
  Auth('super-admin', 'admin'),
  validateRequest(courseValidation.courseFacultyValidationSchema),
  courseController.deleteFacultiesFromCourseFaculties,
);

export const courseRoutes = router;
