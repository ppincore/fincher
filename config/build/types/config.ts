export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
  favicon?: string;
  locales?: string;
  buildLocales: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  analyze: boolean;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  projectTitle: string;
  isDev: boolean;
  port: number;
  analyze: boolean;
  project: 'storybook' | 'frontend' | 'jest';
}
