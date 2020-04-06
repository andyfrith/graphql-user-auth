import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';
import { createTokens } from '../tokens';

export const resolvers = {
  Query: {
    me: async (_, __, { req }) => {
      if (!req.userId) {
        return null;
      }

      return await User.findOne(req.userId);
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
        .set({ count: () => 'count + 1' })
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

      const { accessToken, refreshToken } = createTokens(user);

      res.cookie('refresh-token', refreshToken, { maxAge: 60 * 60 * 60 * 24 * 7 });
      res.cookie('access-token', accessToken, { maxAge: 60 * 60 * 15 });

      return user;
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
