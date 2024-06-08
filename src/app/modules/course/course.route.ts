import express from 'express'
import { courseController } from './course.controller'
import validateRequest from '../../middlewares/validateRequest'
import { courseValidation } from './course.validation'
const router = express.Router()


router.get('/',courseController.getAllCorses)
router.get('/:id',courseController.getCourseById)
router.post('/',validateRequest(courseValidation.createCourseValidation),courseController.createCourse)
router.patch('/:id',validateRequest(courseValidation.updateCourseValidation),courseController.updateSingleCourse)
router.delete('/:id',courseController.deleteCourse)
router.put('/:id/assign-faculties',validateRequest(courseValidation.createCourseFacultyValidationSchema),courseController.assignFaculties)

export const courseRoutes =  router