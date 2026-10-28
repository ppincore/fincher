import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta = {
  title: 'shared/Radio/Button',
  component: RadioButton,
  args: {},
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

const Checked = {
  ...Primary,
  args: {
    value: true,
  },
};

const WithLabel: Story = {
  ...Primary,
  args: {
    label: 'RadioButton',
  },
};

const UnChecked = {
  ...Primary,
  args: {
    value: false,
  },
};

const CheckedDisabled = {
  ...Checked,
  args: {
    value: true,
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
