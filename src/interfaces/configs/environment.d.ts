import { DeployEnvironment, NodeEnv } from "../../enums/shared.enum";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEPLOYED_ENV?: DeployEnvironment | string;
      NODE_ENV?: NodeEnv | string;
      PORT?: number;

      // ADFS
      ADFS_CLIENT_ID?: string;
      ADFS_CLIENT_SECRET?: string;

      // UI
      UI_BUNDLE_URL?: string;

      // JSON PLACEHOLDER
      JSON_PLACEHOLDER_URL?: string;

      // Status
      ATM_GIT_COMMIT?: string;

      // MY
      MATCH_SERVICE_TOKEN: string;
      MATCH_SERVICE_URL?: string;
    }
  }
}

export {};
