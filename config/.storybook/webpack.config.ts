import path from 'path';
import webpack, { DefinePlugin } from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import { svgLoader } from '../build/buildLoaders';
import { getAlias } from '../build/buildResolvers';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    favicon: path.resolve(__dirname, '..', '..', 'public', 'favicon.ico'),
    locales: '',
    buildLocales: '',
  };

  const srcPath = paths.src;

  config.resolve!.modules = [srcPath, 'node_modules'];
  config.resolve?.extensions?.push('.ts', '.tsx');
  config.resolve!.alias = getAlias(srcPath);

  config.module!.rules = config.module!.rules!.map((rule: any) => {
    if (/svg/.test(rule.test)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  config.module?.rules?.push(svgLoader);

  config.module?.rules?.push(buildCssLoader(true));

  config.plugins?.push(
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __PROJECT__: JSON.stringify('storybook'),
    }),
  );

  return config;
};
