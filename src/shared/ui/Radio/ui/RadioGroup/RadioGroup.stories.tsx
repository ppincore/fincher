import type { Meta, StoryObj } from '@storybook/react';
import { IconAlertOctagon } from '@shared/assets/icons';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'shared/Radio/Group',
  component: RadioGroup,
  // decorators: [(story: any) => <div style={{ zoom: 4.5 }}>{story()}</div>],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedOptions = [
  { text: 'text1', value: 'value1', icon: IconAlertOctagon },
  { text: 'text2', value: 'value2', icon: IconAlertOctagon },
  { text: 'text3', value: 'value3', icon: IconAlertOctagon },
  { text: 'text4', value: 'value4', icon: IconAlertOctagon },
  { text: 'text5', value: 'value5', icon: IconAlertOctagon },
  { text: 'text6', value: 'value6', icon: IconAlertOctagon },
];

const Primary: Story = {
  args: { options: mockedOptions, selected: mockedOptions[0] },
};

export { Primary };
