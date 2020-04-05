import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import { createConnection } from 'typeorm';
import { server } from './graphql';
import { ENV } from './env';
import { logger } from './logger';

(async () => {
  logger.info('graphql-user-auth service starting', { ENV });
  await createConnection();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: '12345',
    })
  );

  app.use('/healthy', async (req, res) => {
    res.send({
      message: 'graphql-user-auth is ok',
    });
  });

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port: ENV.PORT }, () => {
    logger.info(`graphql-user-auth listening at :${ENV.PORT}...`);
  });
})();
