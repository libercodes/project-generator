import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'development' ? 'silly' : 'info',
    }),
  ],
});

export default logger;
