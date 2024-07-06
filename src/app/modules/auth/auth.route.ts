import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { authControllers } from './auth.controller';
import Auth from '../../middlewares/auth';


const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  authControllers.loginUser,
);
router.post(
  '/change-password',
  Auth('super-admin', 'admin', 'student', 'faculty'),
  validateRequest(AuthValidation.changePasswordSchema),
  authControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  authControllers.refreshToken,
);


router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidation),
  authControllers.forgotPassword,
);

router.post(
  '/reset-password',

  validateRequest(AuthValidation.resetPasswordValidation),
  authControllers.resetPassword,
);



export const authRoutes = router;
