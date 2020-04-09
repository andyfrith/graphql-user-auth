import { sign } from 'jsonwebtoken';
import { User } from './entity/User';
import { ENV } from './env';

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, ENV.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    ENV.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );
};
