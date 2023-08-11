import { createApplication } from "graphql-modules";
import modules from "../modules";
import providers from "../providers";

export const application = createApplication({
  modules,
  providers,
});

export default application;
