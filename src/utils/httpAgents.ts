import Agent from 'agentkeepalive';

export const createHttpAgent = () =>
  new Agent({
    freeSocketTimeout: 30000,
    timeout: 60000,
  });

export const createHttpsAgent = () =>
  new Agent.HttpsAgent({
    freeSocketTimeout: 30000,
    timeout: 60000,
  });
