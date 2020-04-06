import { sign } from 'jsonwebtoken';
import { User } from './entity/User';
import { ENV } from './env';

export const createTokens = (user: User) => {
  const accessToken = sign({ userId: user.id }, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: '15min',
  });

  const refreshToken = sign(
    { userId: user.id, count: user.count },
    ENV.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );

  return { accessToken, refreshToken };
};
