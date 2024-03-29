import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';

import { dbConnection } from './libs/sequelize';

import authRoutes from './api/auth/auth.routes';
import cardRoutes from './api/card/card.routes';
import taskRoutes from './api/task/task.routes';

dotenv.config();
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors());

app.get('/api', (req, res) => {
  res.json({ success: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/card', cardRoutes);
app.use('/api/task', taskRoutes);

app.listen(PORT, async () => {
  try {
    await dbConnection();
    console.log(`App is running on ${process.env.APP_DOMAIN}:${PORT}`);
  } catch (err: any) {
    console.log(err);
  }
});
