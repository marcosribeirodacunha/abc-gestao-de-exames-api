import { NextFunction, Request, Response } from 'express';
import AppError from 'src/errors/AppError';

function handleErrors(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.log('\nerror >>', error.message, '\n');
  return res.status(500).json({ message: 'Internal Server Error' });
}

export default handleErrors;
