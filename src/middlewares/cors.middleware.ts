import cors from 'cors';
import { RequestHandler } from 'express';
import appConfig from '../configs';
import { IS_LOCAL_ENV, IS_PROD_ENV } from '../consts';
import { Header } from '../enums/shared.enum';

const { nonProdCORSAllowlist, prodCORSAllowlist } = appConfig;
const allowlist: string[] = IS_PROD_ENV ? prodCORSAllowlist : nonProdCORSAllowlist;
const allowedHeaders = IS_LOCAL_ENV ? undefined : [Header.AUTHORIZATION, Header.CONTENT_TYPE];

const corsMiddleware = (allowList: string[] = allowlist): RequestHandler =>
  cors({
    allowedHeaders,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'PATCH', 'OPTIONS'],
    optionsSuccessStatus: 200,
    origin: (origin, callback) => {
      if (!origin || allowList.includes(origin)) {
        callback(null, true);
      } else {
        const errMsg = `${origin} is not allowed by CORS`;
        callback(new Error(errMsg));
      }
    },
  });

export default corsMiddleware;
