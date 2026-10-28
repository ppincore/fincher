import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from '@app/providers/StoreProvider';

export const StoreDecorator =
  // eslint-disable-next-line react/display-name
  (initialState: DeepPartial<StateSchema>) => (StoryComponent: StoryFn) => (
    <StoreProvider initialState={initialState}>
      <StoryComponent />
    </StoreProvider>
  );
