import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  title: 'shared/Typography',
  component: Typography,
  args: {
    children: 'Lorem Ipsum dolor',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

const Secondary: Story = {
  args: {
    color: 'secondary',
  },
};

const Brand: Story = {
  args: {
    color: 'brand',
  },
};

const Grey: Story = {
  args: {
    color: 'grey',
  },
};

const GreyDark: Story = {
  args: {
    color: 'greyDark',
  },
};

const Danger: Story = {
  args: {
    color: 'danger',
  },
};

const DangerDisabled: Story = {
  args: {
    color: 'dangerDisabled',
  },
};

const White: Story = {
  args: {
    color: 'white',
  },
};

const CenterAlign: Story = {
  ...Primary,
  args: {
    align: 'center',
  },
};

const RightAlign: Story = {
  ...Primary,
  args: {
    align: 'right',
  },
};

const Heading1: Story = {
  ...CenterAlign,
  args: {
    size: 'heading1',
  },
};

const Heading2: Story = {
  ...CenterAlign,
  args: {
    size: 'heading2',
  },
};

const Heading3: Story = {
  ...CenterAlign,
  args: {
    size: 'heading3',
  },
};

const Body1: Story = {
  ...Primary,
  args: {
    size: 'body1',
  },
};

const Body2: Story = {
  ...Primary,
  args: {
    size: 'body2',
  },
};

const Caption1: Story = {
  ...Primary,
  args: {
    size: 'caption1',
  },
};

export {
  Primary,
  CenterAlign,
  RightAlign,
  Heading1,
  Heading2,
  Heading3,
  Body1,
  Body2,
  Caption1,
  Secondary,
  Brand,
  Grey,
  GreyDark,
  Danger,
  DangerDisabled,
  White,
};
