import type { Meta, StoryObj } from '@storybook/react';
import { Overlay } from './Overlay';

const meta = {
  title: 'shared/Overlay',
  component: Overlay,
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
