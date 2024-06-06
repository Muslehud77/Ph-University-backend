import express from 'express'
import { adminServices } from './admin.service'
import validateRequest from '../../middlewares/validateRequest'
import { adminValidations } from './admin.validation'

const router = express.Router()

router.get('/',adminServices.getAllAdminFromDB)
router.get('/:id',adminServices.getAdminByIdFromDB)
router.patch('/:id',validateRequest(adminValidations.updateAdminValidationSchema),adminServices.updateAdminInDB)
router.delete('/:id',adminServices.deleteAdminFromDB)

export const adminRoutes = router