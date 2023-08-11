import { allow, shield } from 'graphql-shield';
import { IS_LOCAL_ENV } from '../../../consts';

const permissions = shield(
  {
    Query: {
      '*': allow,
    },
  },
  { allowExternalErrors: true, debug: IS_LOCAL_ENV },
);

export default permissions;
