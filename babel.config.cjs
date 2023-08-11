module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: { node: true },
      },
    ],
    '@babel/preset-typescript',
  ];
  const plugins = [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-class-properties',
  ];

  return { plugins, presets };
};
