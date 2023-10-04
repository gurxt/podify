import { create } from '#/controllers/user_controller';
import { validate } from '#/middleware/validator';
import { IUserSchema } from '#/util/validation_schema';
import { Router } from 'express';

const router = Router();

router.post('/create', validate(IUserSchema), create);

export default router;