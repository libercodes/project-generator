import { Application } from 'express';
import { respondNotFound } from '../helpers/response.helper';
import { input } from '../middleware/logger.middleware';

export default (app: Application) => {
  app.use(input);
  // API routes from modules

  app.use(respondNotFound);
};
