import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { verify } from 'jsonwebtoken';
import { createConnection } from 'typeorm';
import { server } from './graphql';
import { ENV } from './env';
import { createTokens } from './tokens';
import { logger } from './logger';
import { User } from './entity/User';

(async () => {
  logger.info('graphql-user-auth service starting', { ENV });
  await createConnection();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(async (req: any, res: any, next) => {
    const accessToken = req.cookies['access-token'];
    const refreshToken = req.cookies['refresh-token'];

    if (!accessToken && !refreshToken) {
      return next();
    }

    try {
      const data = verify(accessToken, ENV.ACCESS_TOKEN_SECRET) as any;
      req.userId = data.userId;
      return next();
    } catch (err) {}

    if (!refreshToken) {
      return next();
    }

    let data: any;

    try {
      data = verify(refreshToken, ENV.REFRESH_TOKEN_SECRET) as any;
    } catch (err) {
      return next();
    }

    const user = await User.findOne(data.userId);
    if (!user || user.count !== data.count) {
      return next();
    }

    const tokens = createTokens(user);

    res.cookie('refresh-token', tokens.refreshToken, { maxAge: 60 * 60 * 60 * 24 * 7 });
    res.cookie('access-token', tokens.accessToken, { maxAge: 60 * 60 * 15 });
    req.userId = user.id;

    next();
  });

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
