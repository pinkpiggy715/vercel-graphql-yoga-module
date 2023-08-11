import { DeployEnvironment, NodeEnv } from "./../../enums/shared.enum";

export interface AppConfig {
  deployedEnv?: DeployEnvironment | string;
  nodeEnv?: NodeEnv | string;
  nonProdCORSAllowlist: string[];
  port?: number;
  prodCORSAllowlist: string[];
  serviceTokens: {
    userService?: string;
  };
  serviceURLs: {
    userService?: string;
  };
  status: {
    atmGitCommit: string;
  };
}
