import * as Types from "../../../types/graphql";
import * as gm from "graphql-modules";
export namespace UserModule {
  interface DefinedFields {
    Query: 'getUserName';
    Mutation: 'saveUserName';
    SaveUserNameResponse: 'success' | 'message';
  };
  
  interface DefinedInputFields {
    SaveUserNameMutationInput: 'Name';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type SaveUserNameResponse = Pick<Types.SaveUserNameResponse, DefinedFields['SaveUserNameResponse']>;
  export type SaveUserNameMutationInput = Pick<Types.SaveUserNameMutationInput, DefinedInputFields['SaveUserNameMutationInput']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type SaveUserNameResponseResolvers = Pick<Types.SaveUserNameResponseResolvers, DefinedFields['SaveUserNameResponse'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    SaveUserNameResponse?: SaveUserNameResponseResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getUserName?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      saveUserName?: gm.Middleware[];
    };
    SaveUserNameResponse?: {
      '*'?: gm.Middleware[];
      success?: gm.Middleware[];
      message?: gm.Middleware[];
    };
  };
}