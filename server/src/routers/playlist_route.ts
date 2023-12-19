import {
  createPlaylist,
  getAudios,
  getPlaylistByProfile,
  removePlaylist,
  updatePlaylist,
} from '#/controllers/playlist_controller';
import { isVerified, mustAuth } from '#/middleware/auth';
import { validate } from '#/middleware/validator';
import {
  NewPlaylistValidationSchema,
  OldPlaylistValidationSchema,
} from '#/util/validation_schema';
import { Router } from 'express';

const playlistRouter = Router();

playlistRouter.post(
  '/create',
  mustAuth,
  isVerified,
  validate(NewPlaylistValidationSchema),
  createPlaylist
);
playlistRouter.patch(
  '/',
  mustAuth,
  validate(OldPlaylistValidationSchema),
  updatePlaylist
);
playlistRouter.delete('/', mustAuth, removePlaylist);
playlistRouter.get('/by-profile', mustAuth, getPlaylistByProfile);
playlistRouter.get('/:playlistId', mustAuth, getAudios);

export default playlistRouter;
