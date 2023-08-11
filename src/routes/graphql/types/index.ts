import { Request, Response } from 'express';
import { contextConfig } from '..';

export interface ServerContext {
  req: Request;
  res: Response;
}

export type ContextConfig = ReturnType<typeof contextConfig>;

declare global {
  namespace GraphQLModules {
    interface GlobalContext extends ContextConfig {
      req: Request;
      res: Response;
      txId: string;
      uuid: string;
    }
  }
}

export type GraphQLModulesGlobalContext = GraphQLModules.GlobalContext;
