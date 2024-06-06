import express from 'express'
import { adminServices } from './admin.service'
import validateRequest from '../../middlewares/validateRequest'
import { adminValidations } from './admin.validation'
import { adminController } from './admin.controller'

const router = express.Router()

router.get('/',adminController.getAllAdmins)
router.get('/:id',adminController.getAdminById)
router.patch('/:id',validateRequest(adminValidations.updateAdminValidationSchema),adminController.updateAdmin)
router.delete('/:id',adminController.deleteAdmin)

export const adminRoutes = router