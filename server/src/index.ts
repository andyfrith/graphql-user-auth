import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { verify } from 'jsonwebtoken';
import { createConnection } from 'typeorm';
import { server } from './graphql';
import { ENV } from './env';
import { createAccessToken, createRefreshToken } from './tokens';
import { sendRefreshToken } from './sendRefreshToken';
import { logger } from './logger';
import { User } from './entity/User';

(async () => {
  logger.info('graphql-user-auth service starting', { ENV });
  await createConnection();

  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, ENV.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  /*
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
      console.log(data);
    } catch (err) {
      return next();
    }

    const user = await User.findOne(data.userId);
    if (!user || user.tokenVersion !== data.tokenVersion) {
      return next();
    }

    res.cookie('refresh-token', createRefreshToken(user), {
      maxAge: 60 * 60 * 60 * 24 * 7,
    });
    res.cookie('access-token', createAccessToken(user), { maxAge: 60 * 60 * 15 });
    req.userId = user.id;

    next();
  });
  */

  app.use('/healthy', async (req, res) => {
    res.send({
      message: 'graphql-user-auth is ok',
    });
  });

  server.applyMiddleware({ app, path: '/graphql', cors: false });

  app.listen({ port: ENV.PORT }, () => {
    logger.info(`graphql-user-auth listening at :${ENV.PORT}...`);
  });
})();
