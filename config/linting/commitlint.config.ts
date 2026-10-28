import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-angular',
  formatter: '@commitlint/format',
  ignores: [(commit) => commit === ''],
  defaultIgnores: true,
  helpUrl:
    'https://github.com/conventional-changelog/commitlint/#what-is-commitlint OR ask bollgade@yandex.ru',
};

export default Configuration;
