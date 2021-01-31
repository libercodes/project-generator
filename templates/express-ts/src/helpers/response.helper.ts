import { RequestHandler } from 'express-serve-static-core';

export const respondNotFound: RequestHandler = (req, res, next) => {
  res.status(404);
  res.json({ status: false, message: 'Resource not found' });
};
