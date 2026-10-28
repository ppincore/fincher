import type { Meta, StoryObj } from '@storybook/react';
import { PopupMenu } from './PopupMenu';

const meta = {
  title: 'shared/PopupMenu/Menu',
  component: PopupMenu,
} satisfies Meta<typeof PopupMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    trigger: <div>SomeText</div>,
    items: [
      { text: 'item1', onClick: () => console.debug('item1') },
      { text: 'item2', onClick: () => console.debug('item2') },
      { text: 'item3', onClick: () => console.debug('item3') },
      { text: 'item4', onClick: () => console.debug('item4') },
    ],
  },
};

export { Primary };
