import type { Meta, StoryObj } from '@storybook/react';
import { IconAlertOctagon } from '@shared/assets/icons';
import { Button } from './Button';
import { ButtonSize, ButtonTheme } from '../../consts/button';

const meta = {
  title: 'shared/Button/Button',
  component: Button,
  args: {
    children: 'Text',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    size: ButtonSize.M,
  },
};

const WithAddons: Story = {
  args: {
    size: ButtonSize.M,
    addonLeft: <IconAlertOctagon />,
    addonRight: <IconAlertOctagon />,
  },
};

const Text = {
  args: {
    theme: ButtonTheme.TEXT,
  },
};

const Secondary = {
  args: {
    theme: ButtonTheme.SECONDARY,
  },
};

const Dangerous = {
  args: {
    theme: ButtonTheme.DANGEROUS,
  },
};

const DangerousSecondary = {
  args: {
    theme: ButtonTheme.DANGEROUS_SECONDARY,
  },
};

const Outline = {
  args: {
    theme: ButtonTheme.OUTLINE,
  },
};

const SizeS = {
  args: {
    size: ButtonSize.S,
  },
};

const SizeM = {
  args: {
    size: ButtonSize.M,
  },
};

const SizeL = {
  args: {
    size: ButtonSize.L,
  },
};

const Square: Story = {
  args: {
    size: ButtonSize.M,
    children: '>',
    theme: ButtonTheme.OUTLINE,
    square: true,
  },
};

const SquareSizeL = {
  args: {
    children: '>',
    theme: ButtonTheme.OUTLINE,
    square: true,
    size: ButtonSize.L,
  },
};

const SquareSizeS = {
  args: {
    children: '>',
    theme: ButtonTheme.OUTLINE,
    square: true,
    size: ButtonSize.S,
  },
};

const Disabled = {
  args: {
    disabled: true,
  },
};

const Loading: Story = {
  ...Primary,
  args: {
    size: ButtonSize.M,
    isLoading: true,
  },
};

const SquareLoading: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.M,
    isLoading: true,
    square: true,
  },
};

export {
  Primary,
  Secondary,
  WithAddons,
  Text,
  Dangerous,
  DangerousSecondary,
  Outline,
  SizeS,
  SizeM,
  SizeL,
  Square,
  SquareSizeS,
  SquareSizeL,
  Loading,
  SquareLoading,
  Disabled,
};
