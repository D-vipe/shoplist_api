import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'game-service' },
  transports: [
    ...(process.env.NODE_ENV !== 'production'
      ? [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.simple()
          ),
        }),
      ]
      : []),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.info('Logging initialized at debug level');
}

export default logger;
