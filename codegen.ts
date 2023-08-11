import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  emitLegacyCommonJSImports: false,
  generates: {
    './src/routes/graphql/modules/': {
      config: {
        contextType: 'GraphQLModules.Context',
      },
      plugins: [
        {
          typescript: {
            enumsAsTypes: false,
            inputMaybeValue: 'T | undefined',
            maybeValue: 'T | null | undefined',
          },
        },
        'typescript-resolvers',
      ],
      preset: 'graphql-modules',
      presetConfig: {
        baseTypesPath: '../types/graphql.ts',
        filename: 'generated-types/module-types.ts',
      },
    },
  },
  schema: './src/routes/graphql/modules/**/*.graphql',
  watch: true,
};

export default config;
