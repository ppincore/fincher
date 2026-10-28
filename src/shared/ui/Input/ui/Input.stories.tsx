import type { Meta, StoryObj } from '@storybook/react';
import { IconAlertOctagon } from '@shared/assets/icons';
import { Input } from './Input';

const meta = {
  title: 'shared/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

const WithValue: Story = {
  args: {
    value: 'Bollgade',
  },
};

const PasswordWithValue: Story = {
  args: {
    value: 'Bollgade',
    type: 'password',
  },
};

const WithAddons: Story = {
  args: {
    value: 'Bollgade',
    addonLeft: <IconAlertOctagon />,
    addonRight: <IconAlertOctagon />,
  },
};

const WithPlaceholder: Story = {
  args: {
    placeholder: 'Bollgade',
  },
};

const ReadOnlyPrimary: Story = {
  args: {
    readOnly: true,
  },
};

const ReadOnlyWithValue: Story = {
  args: {
    value: 'Bollgade',
    readOnly: true,
  },
};

export {
  Primary,
  WithValue,
  PasswordWithValue,
  WithAddons,
  WithPlaceholder,
  ReadOnlyPrimary,
  ReadOnlyWithValue,
};
