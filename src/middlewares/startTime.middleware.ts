import { NextFunction, Request, RequestHandler, Response } from 'express';

const startTime =
  (): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {
    res.locals.logging = {
      startTime: Date.now(),
    };
    next();
  };

export default startTime;
