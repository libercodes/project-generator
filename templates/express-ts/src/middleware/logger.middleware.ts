import * as uuid from 'uuid';
import { RequestHandler, Response } from 'express';
import _ from 'lodash';
import logger from '../helpers/logger.helper';

interface IResponse extends Response {
  txtid: string;
}

export const input: RequestHandler = (req, res: IResponse, next) => {
  res.txtid = uuid.v4();
  let log: string = `${res.txtid} >> ${req.method} - ${req.url}`;
  if (req.body && !_.isEmpty(req.body)) {
    log = log.concat(` >> ${JSON.stringify(req.body)}`);
  }
  logger.info(log);
  next();
};

export const output = (res: IResponse, body: any = {}) => {
  logger.info(`${res.txtid} << ${res.status} - ${JSON.stringify(body).substring(0, 2500)}`);
};
