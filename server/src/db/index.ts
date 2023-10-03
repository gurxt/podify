import mongoose from "mongoose";

const URI = process.env.MONGO_URI as string;

mongoose.connect(URI)
  .then(() => console.log('[INFO] db is connected.')) 
  .catch((err) => console.error(`[ERROR] db connection failed.\n${err}`));
