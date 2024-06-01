import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
import { academicFacultyControllers } from './academicFaculty.controller';

const router = express.Router()


router.post('/create-academic-faculty',validateRequest(academicFacultyValidation),academicFacultyControllers.createAcademicFaculty)
router.get('/',academicFacultyControllers.getAllAcademicFaculty)
router.get('/:id',academicFacultyControllers.getAcademicFacultyById)
router.patch('/:id',validateRequest(academicFacultyValidation),academicFacultyControllers.updateAcademicFacultyById)




export const academicFacultyRoutes = router