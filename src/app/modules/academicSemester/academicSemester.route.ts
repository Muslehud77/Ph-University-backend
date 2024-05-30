import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import academicSemesterValidation from './academicSemester.validation'
import { AcademicSemesterControllers } from './academicSemester.controller'

const router = express.Router()

router.post('/create-semester',validateRequest(academicSemesterValidation),AcademicSemesterControllers.createAcademicSemester)

export const semesterRoutes = router