import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta = {
  title: 'shared/Chip',
  component: Chip,
  args: {
    text: 'Chip1',
  },
  decorators: [(story: any) => <div style={{ zoom: 4.5 }}>{story()}</div>],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
