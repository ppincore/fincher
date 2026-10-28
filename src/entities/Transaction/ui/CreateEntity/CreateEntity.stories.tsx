import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize } from '@shared/ui/Button';
import { CreateEntity } from './CreateEntity';

const ComponentForStories = CreateEntity;

const meta = {
  title: 'entities/Transaction/CreateEntity',
  component: ComponentForStories,
  args: {},
} satisfies Meta<typeof ComponentForStories>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    Trigger: ({ onClick }) => <Button size={ButtonSize.L} onClick={onClick} />,
  },
};

export { Primary };
