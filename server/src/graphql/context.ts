import { Request } from 'express';

export type GraphqlContext = ReturnType<typeof context>;

export function context({ req }: { req: Request }) {
  const token = 'Make way for the bad guy!';
  const ctx = { req, token };

  return {
    ...ctx,
  };
}
