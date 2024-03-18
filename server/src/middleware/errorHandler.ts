import { Request, Response, NextFunction } from 'express';

// Error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack trace

  // Set the status code and send back an error response
  res.status(500).json({
    error: 'Internal server error'
  });
};

export default errorHandler;
