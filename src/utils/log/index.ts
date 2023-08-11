import { SerializableGraphQLErrorLike } from '@envelop/core';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Errback, NextFunction, Request, Response, Send } from 'express';
import { GraphQLError } from 'graphql';
import pino from 'pino';
import { IS_LOCAL_ENV } from '../../consts';
import { LOG_REDACT_LIST } from '../../consts/log';
import { Header, LogType } from '../../enums/shared.enum';
import {
  shouldSkipLogRequest,
  shouldSkipLogResponse,
  shouldSkipLogServiceData,
} from './shouldSkipLog';

class Logger {
  public static log: pino.Logger = pino({
    base: null,
    formatters: {
      level: (level) => ({ level }),
    },
    // "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent"
    level: IS_LOCAL_ENV ? 'trace' : 'info',
    redact: LOG_REDACT_LIST,
    timestamp: false,
    ...(IS_LOCAL_ENV
      ? {
          transport: {
            options: {
              colorize: true,
            },
            target: 'pino-pretty',
          },
        }
      : {}),
  });

  public static logIncomingRequest = (req: Request, res: Response, next: NextFunction) => {
    const { txId } = res.locals;
    const { baseUrl, body, headers, hostname, method, originalUrl, params, query, url } = req;
    res.locals.logging.skipLogResponse = shouldSkipLogResponse(url);
    if (shouldSkipLogRequest(url)) {
      res.locals.logging.skipLogRequest = true;
    } else {
      Logger.log.info({
        baseUrl,
        body,
        headers,
        hostname,
        method,
        originalUrl,
        params,
        query,
        txId,
        type: LogType.INCOMING_REQUEST,
        url,
      });
    }
    next();
  };

  public static logOutgoingRequest = (requestConfig: AxiosRequestConfig) => {
    Logger.log.info({
      type: LogType.OUTGOING_REQUEST,
      ...Logger.filterRequestConfig(
        requestConfig,
        shouldSkipLogServiceData(requestConfig.url || ''),
      ),
    });
  };

  public static logIncomingResponse = (response: AxiosResponse) => {
    Logger.log.info({
      type: LogType.INCOMING_RESPONSE,
      ...Logger.filterIncomingResponse(response),
    });
  };

  public static logIncomingErrorResponse = (
    { code, config, message, name, response, stack }: AxiosError,
    txId: string,
  ) => {
    Logger.log.error({
      code,
      config: Logger.filterRequestConfig(config || {}, shouldSkipLogServiceData(config?.url || '')),
      error: response?.data,
      message,
      name,
      response: Logger.filterIncomingResponse(response),
      stack,
      txId,
      type: LogType.INCOMING_ERROR_RESPONSE,
    });
  };

  private static generalResponseInterceptor =
    (originalFunc: Send, req: Request, res: Response) => (resBody: unknown) => {
      const {
        locals: {
          logging: { skipLoggingRequest, skipLoggingResponse },
          txId,
        },
        statusCode,
      } = res;
      if (!skipLoggingRequest && !skipLoggingResponse) {
        const { method, originalUrl, params, query, url } = req;
        Logger.log.info({
          headers: res.getHeaders(),
          requestConfig: { method, originalUrl, params, query, url },
          responseTimeInMs: Date.now() - res.locals.logging?.startTime,
          statusCode,
          txId,
          type: LogType.OUTGOING_RESPONSE,
        });
        res.locals.logging.skipLoggingRequest = true;
        res.locals.logging.skipLoggingResponse = true;
      }
      return originalFunc(resBody);
    };

  private static redirectResponseInterceptor =
    (
      originalFunc: {
        (url: string): void;
        (status: number, url: string): void;
        (url: string, status: number): void;
      },
      req: Request,
      res: Response,
    ) =>
    (param1: any, param2?: any) => {
      const {
        locals: {
          logging: { skipLoggingRequest, skipLoggingResponse },
          txId,
        },
        statusCode,
      } = res;
      if (!skipLoggingRequest && !skipLoggingResponse) {
        const { method, originalUrl, params, query, url } = req;
        Logger.log.info({
          headers: res.getHeaders(),
          redirectedTo: param1,
          requestConfig: { method, originalUrl, params, query, url },
          responseTimeInMs: Date.now() - res.locals.logging?.startTime,
          statusCode,
          txId,
          type: LogType.OUTGOING_RESPONSE,
        });
        res.locals.logging.skipLoggingRequest = true;
        res.locals.logging.skipLoggingResponse = true;
      }
      if (param2) return originalFunc(param1, param2);
      return originalFunc(param1);
    };

  private static sendFileResponseInterceptor =
    (
      originalFunc: {
        (path: string, fn?: Errback): void;
        (path: string, options: any, fn?: Errback): void;
      },
      req: Request,
      res: Response,
    ) =>
    (path: string, param2?: any, param3?: any) => {
      const {
        locals: {
          logging: { skipLoggingRequest, skipLoggingResponse },
          txId,
        },
        statusCode,
      } = res;
      if (!skipLoggingRequest && !skipLoggingResponse) {
        const { method, originalUrl, params, query, url } = req;
        Logger.log.info({
          fileName: path,
          headers: res.getHeaders(),
          requestConfig: { method, originalUrl, params, query, url },
          responseTimeInMs: Date.now() - res.locals.logging?.startTime,
          statusCode,
          txId,
          type: LogType.OUTGOING_RESPONSE,
        });
        res.locals.logging.skipLoggingRequest = true;
        res.locals.logging.skipLoggingResponse = true;
      }
      if (param3) return originalFunc(path, param2, param3);
      return originalFunc(path, param2);
    };

  public static logOutgoingResponse = (req: Request, res: Response, next: NextFunction) => {
    const sendFunc = res.send.bind(res);
    const jsonFunc = res.json.bind(res);
    const redirectFunc = res.redirect.bind(res);
    const sendFileFunc = res.sendFile.bind(res);

    res.send = Logger.generalResponseInterceptor(sendFunc, req, res);
    res.json = Logger.generalResponseInterceptor(jsonFunc, req, res);
    res.redirect = Logger.redirectResponseInterceptor(redirectFunc, req, res);
    res.sendFile = Logger.sendFileResponseInterceptor(sendFileFunc, req, res);
    next();
  };

  private static getGraphqlError = (
    err?: Error | SerializableGraphQLErrorLike,
  ): undefined | Error | ReturnType<SerializableGraphQLErrorLike['toJSON']> => {
    if (err) {
      if ('toJSON' in err) {
        const json = err.toJSON();
        return json;
      }
      return err;
    }
    return undefined;
  };

  public static logOutgoingGraphQLResponse = (
    req: Request,
    res: Response,
    err?: Error | GraphQLError | SerializableGraphQLErrorLike,
    phase?: 'context' | 'execution' | 'parse' | 'validate',
  ) => {
    const {
      locals: { txId },
      statusCode,
    } = res;
    const { body, headers, method, originalUrl, params, query, url } = req;
    const jsonError = Logger.getGraphqlError(err);
    const logPayload = {
      error: jsonError && { ...jsonError, stack: err?.stack ? err.stack.split('\n') : [] },
      headers: res.getHeaders(),
      phase,
      requestConfig: { body, headers, method, originalUrl, params, query, url },
      responseTimeInMs: Date.now() - res.locals.logging?.startTime,
      statusCode,
      txId,
      type: LogType.OUTGOING_RESPONSE,
    };

    if (err) {
      Logger.log.error({
        ...logPayload,
        statusCode: err instanceof GraphQLError ? err?.extensions?.http?.status || 400 : 400,
      });
    } else {
      Logger.log.info(logPayload);
    }
  };

  public static logGenericError = ({ message, name, stack }: Error, txId: string) => {
    Logger.log.error({
      message,
      name,
      stack,
      txId,
      type: LogType.GENERIC_ERROR,
    });
  };

  private static filterRequestConfig = (
    { baseURL, data, headers, method, params, url }: AxiosRequestConfig,
    skipData?: boolean,
  ) => ({
    baseURL,
    data: skipData ? '[Skipped]' : data,
    headers,
    method,
    params,
    txId: headers?.[Header.X_REQUEST_ID],
    url,
  });

  private static filterIncomingResponse = (response?: AxiosResponse) => {
    if (!response) return {};
    const { config, headers, status, statusText } = response;
    const shouldSkipLogData = shouldSkipLogServiceData(config.url || '');
    return {
      headers,
      requestConfig: Logger.filterRequestConfig(config, shouldSkipLogData),
      responseTimeInMs: headers[Header.REQUEST_START_TIME],
      status,
      statusText,
      txId: headers[Header.X_REQUEST_ID],
    };
  };
}

export default Logger;
