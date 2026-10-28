import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta = {
  title: 'shared/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    text: 'Accordion',
    children: 'Some children',
  },
};

export { Primary };
