import type { Meta, StoryObj } from '@storybook/react';
import EntityForm from './Form';

const meta = {
  title: 'entities/Account/Form',
  component: EntityForm,
} satisfies Meta<typeof EntityForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
