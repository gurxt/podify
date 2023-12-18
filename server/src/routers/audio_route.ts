import { createAudio, updateAudio } from '#/controllers/audio_controller';
import { isVerified, mustAuth } from '#/middleware/auth';
import fileParser from '#/middleware/fileParser';
import { validate } from '#/middleware/validator';
import { AudioValidationSchema } from '#/util/validation_schema';
import { Router } from 'express';

const audioRouter = Router();

audioRouter.post(
  '/create',
  mustAuth,
  isVerified,
  fileParser,
  validate(AudioValidationSchema),
  createAudio
);

audioRouter.patch(
  '/:audioId',
  mustAuth,
  isVerified,
  fileParser,
  validate(AudioValidationSchema),
  updateAudio
);

export default audioRouter;
