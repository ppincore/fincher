import type { Meta, StoryObj } from '@storybook/react';
import { PageError } from './PageError';

const meta = {
  title: 'widgets/PageError',
  component: PageError,
} satisfies Meta<typeof PageError>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
