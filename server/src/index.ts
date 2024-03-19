import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { dbConnection, performMigration } from './libs/sequelize';

import authRoutes from './api/auth/auth.routes';
import cardRoutes from './api/card/card.routes';
import taskRoutes from './api/task/task.routes';
import User from './api/user/user.model';
import Card from './api/card/card.model';
import Task from './api/task/task.model';

dotenv.config();
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'success' });
});

app.use('/api/auth', authRoutes);
app.use('/api/card', cardRoutes);
app.use('/api/task', taskRoutes);

app.listen(PORT, async () => {
  // await User.sync({ force: true });
  // await Card.sync({ force: true });
  // await Task.sync({ force: true });
  await dbConnection();
  console.log(`App is running on ${process.env.APP_DOMAIN}:${PORT}`);
});
