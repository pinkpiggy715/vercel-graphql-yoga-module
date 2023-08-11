import { UserModule } from "./generated-types/module-types";

export const resolvers: Pick<UserModule.Resolvers, "Mutation"> = {
  Mutation: {
    saveUserName: async (root, args, context) => {
      return {
        message: `User Name ${args.input.Name} saved successfully`,
        success: true,
      };
    },
  },
};
