import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidations } from './admin.validation';
import { adminController } from './admin.controller';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', Auth('super-admin', 'admin') , adminController.getAllAdmins);
router.get(
  '/:id',
  Auth('super-admin', 'admin'),
  adminController.getAdminById,
);
router.patch(
  '/:id',
  Auth('super-admin', 'admin'),
  validateRequest(adminValidations.updateAdminValidationSchema),
  adminController.updateAdmin,
);
router.delete(
  '/:id',
  Auth('super-admin'),
  adminController.deleteAdmin,
);

export const adminRoutes = router;
