import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { User } from '../entity/User';
import { ENV } from '../env';
import { createAccessToken, createRefreshToken } from '../tokens';
import { sendRefreshToken } from '../sendRefreshToken';

export const resolvers = {
  Query: {
    me: async (_, __, { req }) => {
      const authorization = req.headers['authorization'];

      if (!authorization) {
        return null;
      }

      try {
        const token = authorization.split(' ')[1];
        const payload: any = verify(token, ENV.ACCESS_TOKEN_SECRET!);
        return User.findOne(payload.userId);
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  },
  Mutation: {
    invalidateTokens: async (_, __, { req, res }) => {
      if (!req.userId) {
        return false;
      }

      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ tokenVersion: () => 'tokenVersion + 1' })
        .execute();

      res.clearCookie('access-token');

      return true;
    },
    login: async (_, { email, password }, { res }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }

      sendRefreshToken(res, createRefreshToken(user));

      return {
        accessToken: createAccessToken(user),
        user,
      };

      // res.cookie('refresh-token', createRefreshToken(user), {
      //   maxAge: 60 * 60 * 60 * 24 * 7,
      // });
      // res.cookie('access-token', createAccessToken(user), { maxAge: 60 * 60 * 15 });

      // return user;
    },
    logout: async (_, __, { res }) => {
      sendRefreshToken(res, '');
      return true;
    },

    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        password: hashedPassword,
      }).save();

      return true;
    },
  },
};
