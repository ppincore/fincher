import type { Meta, StoryObj } from '@storybook/react';
import { ProfileForm } from './ProfileForm';

const meta = {
  title: 'features/Authentication/ProfileForm',
  component: ProfileForm,
} satisfies Meta<typeof ProfileForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
