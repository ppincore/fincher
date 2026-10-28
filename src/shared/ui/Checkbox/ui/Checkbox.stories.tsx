import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'shared/Checkbox',
  component: Checkbox,
  args: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

const Checked = {
  ...Primary,
  args: {
    checked: true,
  },
};

const WithLabel: Story = {
  ...Primary,
  args: {
    label: 'Checkbox',
  },
};

const UnChecked = {
  ...Primary,
  args: {
    checked: false,
  },
};

const CheckedDisabled = {
  ...Checked,
  args: {
    disabled: true,
  },
};

const UnCheckedDisabled = {
  ...UnChecked,
  args: {
    disabled: true,
  },
};

export {
  Primary,
  WithLabel,
  Checked,
  UnChecked,
  CheckedDisabled,
  UnCheckedDisabled,
};
