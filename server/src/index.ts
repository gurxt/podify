import express from 'express';
import 'dotenv/config';
import './db';

const PORT = process.env.PORT ?? 8989;

const app = express();

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