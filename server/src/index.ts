import express from 'express';
import 'dotenv/config';
import '#/db';
import authRouter from './routers/auth_route';
import audioRouter from './routers/audio_route';

const PORT = process.env.PORT ?? 8989;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('src/public'));

app.use('/auth', authRouter);
app.use('/audio', audioRouter);

app.listen(PORT, () => console.log(`[INFO] listening on port ${PORT}`));

/**
 * The plan and features
 * upload audio files
 * listen to single audio
 * add to favorites
 * create playlist
 * remove playlist (public/private)
 * remove audio
 */
