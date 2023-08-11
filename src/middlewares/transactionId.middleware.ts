import { NextFunction, Request, RequestHandler, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Header } from '../enums/shared.enum';

const transactionId =
  (): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {
    const txId = req.get(Header.X_REQUEST_ID) || `scaffold-${uuidv4()}`;
    res.locals = { ...res.locals, txId };
    next();
  };

export default transactionId;
