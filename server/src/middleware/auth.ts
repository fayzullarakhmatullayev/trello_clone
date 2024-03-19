import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET!;

interface DecodedToken {
  id: number | string;
}

declare global {
  namespace Express {
    interface Request {
      user_id?: DecodedToken['id']; // Assign the type of decoded ID here
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    const user_id = decoded.id;
    req.user_id = user_id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
