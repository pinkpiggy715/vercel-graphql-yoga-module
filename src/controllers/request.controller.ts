import { Request, Response } from 'express';

export const getLocaleFromReq = (req: Request<unknown>): string => {
  const { baseUrl } = req;
  // check if locale is in baseUrl
  if (baseUrl.match(/[a-z]{2}_[A-Z]{2}/gi)) {
    let locale = baseUrl.split('/')[1];

    const localeParts = locale.split('_');
    if (localeParts.length === 2) {
      locale = `${localeParts[0]}_${localeParts[1].toUpperCase()}`;
    }

    return locale;
  }
  // if (EnvironmentUtil.isDeployedEnvCN()) {
  //   return 'zh_CN';
  // }
  return 'en_US'; // en_US is not appended on the req.url
};
