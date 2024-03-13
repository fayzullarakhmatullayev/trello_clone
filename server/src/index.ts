import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'success' });
});

app.listen(PORT, () => {
  console.log(`App is running on ${process.env.APP_DOMAIN}:${PORT}`);
});
