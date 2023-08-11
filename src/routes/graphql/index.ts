import { useExtendedValidation } from "@envelop/extended-validation";
import { useGraphQLMiddleware } from "@envelop/graphql-middleware";
import { useGraphQLModules } from "@envelop/graphql-modules";
import { EnvelopArmorPlugin } from "@escape.tech/graphql-armor";
import {
  GraphQLError,
  NoSchemaIntrospectionCustomRule,
  specifiedRules,
} from "graphql";
import {
  YogaInitialContext,
  createYoga,
  useErrorHandler,
  usePayloadFormatter,
} from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";
import { IS_PROD_ENV } from "../../consts";
import Logger from "../../utils/log";
import application from "./application";
import permissions from "./permissions";
import { ServerContext } from "./types";

export const graphQLEndpoint = "/api/graphql";

export const contextConfig = async ({
  params,
  req,
  res,
}: ServerContext & YogaInitialContext) => {
  const { txId } = <{ txId: string }>res.locals;
  return {
    req,
    res,
    txId,
    uuid: uuidv4(),
  };
};

const plugins = [
  useGraphQLModules(application),
  useGraphQLMiddleware([permissions]),
  EnvelopArmorPlugin({
    blockFieldSuggestion: {
      enabled: IS_PROD_ENV,
    },
    costLimit: {
      maxCost: 1000,
    },
    maxDepth: {
      n: 10,
    },
  }),
  usePayloadFormatter((result, args) => {
    const { req, res } = args.contextValue as GraphQLModules.GlobalContext;
    if (!result.errors) {
      Logger.logOutgoingGraphQLResponse(req, res);
    }
    return result;
  }),
  useErrorHandler(({ context, errors, phase }) => {
    const { req, res } = context.contextValue as GraphQLModules.GlobalContext;
    Logger.logOutgoingGraphQLResponse(req, res, errors[0], phase);
  }),
  useExtendedValidation<GraphQLModules.GlobalContext>({
    rules: [
      // SpecifiedRules includes all validation rules defined by the GraphQL spec
      // https://github.com/graphql/graphql-js/tree/main/src/validation/rules
      ...specifiedRules,
      ...(IS_PROD_ENV ? [NoSchemaIntrospectionCustomRule] : []),
    ],
  }),
];

const graphqlMiddleware = createYoga({
  context: contextConfig,
  graphiql: !IS_PROD_ENV,
  graphqlEndpoint: graphQLEndpoint,
  maskedErrors: {
    maskError: (error) => {
      const extension =
        error instanceof GraphQLError ? error?.extensions || {} : {};
      const txId = extension.txId || "";
      const status = error ? extension.http?.status || 400 : 200;
      return IS_PROD_ENV
        ? new GraphQLError(`Something went wrong! ${txId}`, {
            extensions: {
              http: {
                status,
              },
            },
          })
        : (error as Error);
    },
  },
  plugins,
});

export default graphqlMiddleware;
