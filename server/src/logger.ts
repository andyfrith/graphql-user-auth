import { ENV } from './env';
import * as pino from 'pino';

export const logger = pino({
  level: ENV.LOG_LEVEL,
  prettyPrint: { colorize: true },
});
