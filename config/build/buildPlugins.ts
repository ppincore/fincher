import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin, { Pattern } from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({
  paths,
  isDev,
  analyze,
  project,
  projectTitle,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: paths.html,
      title: projectTitle,
      favicon: paths.favicon,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __PROJECT__: JSON.stringify(project),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: analyze ? 'server' : 'disabled',
    }),
    new Dotenv({ systemvars: true }),
    (() => {
      const patterns: (Pattern | undefined)[] = [
        paths.locales && { from: paths.locales, to: paths.buildLocales },
      ];

      const filteredPatterns: Pattern[] = patterns.filter(
        (pattern) => typeof pattern !== 'undefined',
      );

      if (filteredPatterns.length === 0) {
        return undefined;
      }

      return new CopyPlugin({
        patterns: filteredPatterns,
      });
    })(),
  ];

  if (isDev) {
    plugins.push(
      new ReactRefreshWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
        },
      }),
    );
  }

  return plugins.filter((plugin) => typeof plugin !== 'undefined');
}
