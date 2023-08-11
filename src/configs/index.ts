import { AppConfig } from "../interfaces/configs/config.interface";

const { env } = process;

const appConfig: AppConfig = {
  deployedEnv: env.DEPLOYED_ENV,
  nodeEnv: env.NODE_ENV,
  nonProdCORSAllowlist: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:4173",
    "http://localhost:3003",
  ],
  port: Number(env.PORT),
  prodCORSAllowlist: [],
  serviceTokens: {
    userService: env.USER_TOKEN,
  },
  serviceURLs: {
    userService: env.USER_URL,
  },
  status: {
    atmGitCommit: env.ATM_GIT_COMMIT || "ATM_GIT_COMMIT is not available",
  },
};

export default appConfig;
