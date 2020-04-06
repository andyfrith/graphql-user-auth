import { Request, Response } from 'express';

export type GraphqlContext = ReturnType<typeof context>;

export function context({ req, res }: { req: Request; res: Response }) {
  const token = 'Make way for the bad guy!';
  const ctx = { token };

  return {
    ...ctx,
    req,
    res,
  };
}
