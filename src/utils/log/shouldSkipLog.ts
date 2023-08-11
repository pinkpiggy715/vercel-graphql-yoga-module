const SKIP_LOG_REGEX = new RegExp(['/__status__', '/metrics', '/sockjs-node'].join('|'), 'i');

const SKIP_LOG_RES_REGEX = new RegExp(['/graphql'].join('|'), 'i');

const SKIP_LOG_DATA_REGEX = new RegExp(['oauth2'].join('|'), 'i');

export const shouldSkipLogRequest = (url: string): boolean => SKIP_LOG_REGEX.test(url);

export const shouldSkipLogResponse = (url: string): boolean => SKIP_LOG_RES_REGEX.test(url);

export const shouldSkipLogServiceData = (url: string): boolean => SKIP_LOG_DATA_REGEX.test(url);
