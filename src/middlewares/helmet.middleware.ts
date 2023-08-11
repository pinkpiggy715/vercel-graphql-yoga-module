import { RequestHandler } from 'express';
import helmet from 'helmet';

const helmetMiddleware = (): RequestHandler =>
  helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false });

export default helmetMiddleware;
