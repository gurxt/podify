import { createUser, forgetPassword, reverifyEmail, verifyEmail } from '#/controllers/user_controller';
import { validate } from '#/middleware/validator';
import { EmailVerificationSchema, IUserSchema } from '#/util/validation_schema';
import { Router } from 'express';

const router = Router();

router.post('/create', validate(IUserSchema), createUser);
router.post('/verify-email', validate(EmailVerificationSchema), verifyEmail);
router.post('/re-verify-email', reverifyEmail);
router.post('/reset-password', forgetPassword);

export default router;