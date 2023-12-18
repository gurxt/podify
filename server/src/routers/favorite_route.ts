import {
  getFavorites,
  getIsFavorite,
  toggleFavorite,
} from '#/controllers/favorite_controller';
import { isVerified, mustAuth } from '#/middleware/auth';
import { Router } from 'express';

const favoriteRouter = Router();

favoriteRouter.post('/', mustAuth, isVerified, toggleFavorite);
favoriteRouter.get('/', mustAuth, getFavorites);
favoriteRouter.get('/is-fav', mustAuth, getIsFavorite);

export default favoriteRouter;
