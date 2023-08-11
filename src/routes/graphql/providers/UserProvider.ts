import { CONTEXT, Inject, Injectable, Scope } from "graphql-modules";
import "reflect-metadata";
import dataLoaders from "../../../dataLoaders";
import type { GraphQLModulesGlobalContext } from "../types";

@Injectable({
  scope: Scope.Operation,
})
export default class UserProvider {
  constructor(@Inject(CONTEXT) private context: GraphQLModulesGlobalContext) {}

  // private dataLoader = {
  //   getUserName: dataLoaders.userService.getName(this.context.txId),
  //   saveUserName: dataLoaders.userService.saveName(this.context.txId),
  // };

  getUserName = async () => {
    return "x";
  };

  saveUserName = async (name: string) => {
    // Save in DB
    return "name";
  };
}
