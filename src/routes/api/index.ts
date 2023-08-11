import { RequestHandler, Router } from 'express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import graphqlMiddleware, { graphQLEndpoint } from '../graphql';

const apiRouter = Router();

apiRouter.use('/graphql', graphqlMiddleware as RequestHandler);
apiRouter.use('/voyager', voyagerMiddleware({ endpointUrl: graphQLEndpoint }));

export default apiRouter;
