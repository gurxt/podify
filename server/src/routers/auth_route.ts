import {
  createUser,
  forgetPassword,
  grantValid,
  reverifyEmail,
  sendProfile,
  signIn,
  updatePassword,
  updateProfile,
  verifyEmail,
} from '#/controllers/auth_controller';
import { isValidPasswordResetToken, mustAuth } from '#/middleware/auth';
import { validate } from '#/middleware/validator';
import {
  IUserSchema,
  SignInValidationSchema,
  TokenAndIDValidation,
  UpdatePasswordSchema,
} from '#/util/validation_schema';
import { Router } from 'express';
import fileParser from '#/middleware/fileParser';
import { logOut } from '#/controllers/auth_controller';

const router = Router();

router.post('/create', validate(IUserSchema), createUser);
router.post('/verify-email', validate(TokenAndIDValidation), verifyEmail);
router.post('/re-verify-email', reverifyEmail);
router.post('/reset-password', forgetPassword);
router.post(
  '/verify-password-reset-token',
  validate(TokenAndIDValidation),
  isValidPasswordResetToken,
  grantValid
);
router.post(
  '/update-password',
  validate(UpdatePasswordSchema),
  isValidPasswordResetToken,
  updatePassword
);
router.post('/sign-in', validate(SignInValidationSchema), signIn);
router.post('/update-profile', mustAuth, fileParser, updateProfile);
router.post('/logout', mustAuth, logOut);
router.get('/is-auth', mustAuth, sendProfile);

export default router;
