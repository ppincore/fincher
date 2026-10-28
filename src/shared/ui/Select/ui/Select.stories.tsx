import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'shared/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    label: 'Choose value',
    options: [
      { value: '123', label: 'First variation' },
      { value: '1234', label: 'Second variation' },
      { value: '1235', label: 'Third variation' },
    ],
  },
};

export { Primary };
