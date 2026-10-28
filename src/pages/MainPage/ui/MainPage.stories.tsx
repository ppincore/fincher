import type { Meta, StoryObj } from '@storybook/react';
import MainPage from './MainPage';

const meta = {
  title: 'pages/MainPage',
  component: MainPage,
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
