import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { dbConnection, performMigration } from './libs/sequelize';

import authRoutes from './api/auth/auth.route';
import User from './api/user/user.model';

dotenv.config();
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'success' });
});

app.use('/api/auth', authRoutes);

app.listen(PORT, async () => {
  // await User.sync({ force: true });
  await dbConnection();
  console.log(`App is running on ${process.env.APP_DOMAIN}:${PORT}`);
});
