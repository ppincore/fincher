import type { Preview } from '@storybook/react';
import {
  StyleDecorator,
  RouterDecorator,
  ThemeDecorator,
} from '../../src/shared/config/storybook/decorators';
import { Theme } from '../../src/app/providers/ThemeProvider';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [StyleDecorator, RouterDecorator, ThemeDecorator(Theme.LIGHT)],
};

export default preview;
