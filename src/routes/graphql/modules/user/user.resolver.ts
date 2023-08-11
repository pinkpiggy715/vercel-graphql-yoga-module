import UserProvider from "../../providers/UserProvider";
import { UserModule } from "./generated-types/module-types";

export const resolvers: Pick<UserModule.Resolvers, "Query"> = {
  Query: {
    getUserName: async (root, args, context) => {
      const dataProvider = context.injector.get(UserProvider);
      return await dataProvider.getUserName();
    },
  },
};
