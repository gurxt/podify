import { createUser, forgetPassword, grantValid, reverifyEmail, updatePassword, verifyEmail } from '#/controllers/user_controller';
import { isValidPasswordResetToken } from '#/middleware/auth';
import { validate } from '#/middleware/validator';
import { IUserSchema, TokenAndIDValidation, UpdatePasswordSchema } from '#/util/validation_schema';
import { Router } from 'express';

const router = Router();

router.post('/create', validate(IUserSchema), createUser);
router.post('/verify-email', validate(TokenAndIDValidation), verifyEmail);
router.post('/re-verify-email', reverifyEmail);
router.post('/reset-password', forgetPassword);
router.post('/verify-password-reset-token', validate(TokenAndIDValidation), isValidPasswordResetToken, grantValid);
router.post('/update-password', validate(UpdatePasswordSchema), isValidPasswordResetToken, updatePassword);

export default router;