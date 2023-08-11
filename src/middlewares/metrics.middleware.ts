import { RequestHandler } from 'express';
import promBundle from 'express-prom-bundle';

const metricsMiddleware = (): RequestHandler =>
  promBundle({
    includeMethod: true,
    includePath: true,
    promClient: {
      collectDefaultMetrics: {},
    },
  });

export default metricsMiddleware;
