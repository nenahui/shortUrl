import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import shortRouter from './routers/short';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use('/short', shortRouter);

const run = async () => {
  await mongoose.connect(config.databaseUrl);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
