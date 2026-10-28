import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export const svgLoader = {
  test: /\.svg$/i,
  use: [
    {
      loader: '@svgr/webpack',
      options: {
        icon: true,
        svgoConfig: {
          plugins: [
            {
              name: 'convertColors',
              params: {
                currentColor: true,
              },
            },
          ],
        },
      },
    },
  ],
};

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const cssLoader = buildCssLoader(isDev);

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const assetsLoader = {
    test: /\.(png|jpe?g|gif|woff2?)$/i,
    type: 'asset/resource',
  };

  return [assetsLoader, svgLoader, typescriptLoader, cssLoader];
}
