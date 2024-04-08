import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

app.listen(3000, () => {
  console.log('Server is running on port 3000! ');
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('mongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });
