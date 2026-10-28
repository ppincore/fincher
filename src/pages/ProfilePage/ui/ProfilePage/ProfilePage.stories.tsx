import type { Meta, StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
