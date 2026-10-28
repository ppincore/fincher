import type { Meta, StoryObj } from '@storybook/react';
import { AppLinkTheme } from '../const/appLink';
import { AppLink } from './AppLink';

const meta = {
  title: 'shared/AppLink',
  component: AppLink,
  args: {
    children: 'AppLink',
    to: '/',
  },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

const Link: Story = {
  args: {
    theme: AppLinkTheme.LINK,
  },
};

const Route: Story = {
  args: {
    theme: AppLinkTheme.ROUTE,
  },
};

const RouteCurrent: Story = {
  args: {
    theme: AppLinkTheme.ROUTE,
    currentPage: true,
  },
};

export { Link, Route, RouteCurrent };
