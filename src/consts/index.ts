import appConfig from '../configs';
import { DeployEnvironment } from '../enums/shared.enum';

const { deployedEnv } = appConfig;

export const IS_PROD_ENV =
  deployedEnv === DeployEnvironment.PROD_US || deployedEnv === DeployEnvironment.PROD_CN;

export const IS_CN_ENV =
  deployedEnv === DeployEnvironment.PROD_CN || deployedEnv === DeployEnvironment.PROD_CN;

export const IS_LOCAL_ENV = deployedEnv === DeployEnvironment.LOCAL_DEV;

export const ROOT_URL_BY_ENV: Record<string, string> = {
  [DeployEnvironment.DEV]: '',
  [DeployEnvironment.LOCAL_DEV]: 'http://localhost:3001',
  [DeployEnvironment.PROD_CN]: '',
  [DeployEnvironment.PROD_US]: '',
  [DeployEnvironment.QA]: '',
  [DeployEnvironment.STAGE_CN]: '',
  [DeployEnvironment.STAGE_US]: '',
};
