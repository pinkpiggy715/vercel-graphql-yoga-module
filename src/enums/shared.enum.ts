export enum DeployEnvironment {
  LOCAL_DEV = 'localDev',
  DEV = 'dev',
  QA = 'qa',
  STAGE_US = 'stageUS',
  STAGE_CN = 'stageCN',
  PROD_US = 'prodUS',
  PROD_CN = 'prodCN',
}

export enum NodeEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
}

export enum Header {
  AUTHORIZATION = 'authorization',
  X_REQUEST_ID = 'x-request-id',
  CONTENT_TYPE = 'content-type',
  REQUEST_DURATION = 'request-duration',
  REQUEST_START_TIME = 'request-start-time',
}

export enum LogType {
  INCOMING_REQUEST = 'INCOMING_REQUEST',
  OUTGOING_REQUEST = 'OUTGOING_REQUEST',
  INCOMING_RESPONSE = 'INCOMING_RESPONSE',
  INCOMING_ERROR_RESPONSE = 'INCOMING_ERROR_RESPONSE',
  OUTGOING_RESPONSE = 'OUTGOING_RESPONSE',
  GENERIC_ERROR = 'GENERIC_ERROR',
}
