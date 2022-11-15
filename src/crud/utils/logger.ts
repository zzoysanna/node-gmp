import winston from 'winston';

const logConfiguration = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'src/crud/logs/logs.txt',
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'src/crud/logs/error-logs.txt',
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    winston.format.printf((info) => `--- ${info.level} ---: ${[info.timestamp]}: ${info.message}`),
  ),
};

export const logger = winston.createLogger(logConfiguration);
export default logger;
