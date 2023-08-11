import axios, { AxiosError } from 'axios';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { constants } from 'os';
import { getSystemErrorName } from 'util';
import Logger from '../utils/log';

const errorHandler =
  (): ErrorRequestHandler =>
  (err: AxiosError, req: Request, res: Response, next: NextFunction): Response => {
    let code = res.statusCode !== 200 ? res.statusCode : 500;
    if (err?.code === getSystemErrorName(-Math.abs(constants.errno.ETIMEDOUT))) {
      code = 408;
    }
    const { txId } = res.locals as { txId: string };
    if (axios.isAxiosError(err)) {
      code = 502;
      Logger.logIncomingErrorResponse(err, txId);
    } else {
      Logger.logGenericError(err, txId);
    }
    return res.status(code).send(`Oops, something went wrong. ${txId}`);
  };

export default errorHandler;
