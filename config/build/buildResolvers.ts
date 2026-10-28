import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export const getAlias = (srcPath: string) => ({
  '@app': `${srcPath}/app`,
  '@pages': `${srcPath}/pages`,
  '@widgets': `${srcPath}/widgets`,
  '@features': `${srcPath}/features`,
  '@entities': `${srcPath}/entities`,
  '@shared': `${srcPath}/shared`,
  '@': srcPath,
});

export function buildResolvers(options: BuildOptions): ResolveOptions {
  const {
    paths: { src: srcPath },
  } = options;

  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    modules: [srcPath, 'node_modules'],
    mainFiles: ['index'],
    alias: getAlias(srcPath),
  };
}
