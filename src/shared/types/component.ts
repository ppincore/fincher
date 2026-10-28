import { JSXElementConstructor, JSX } from 'react';

type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

type PropsOfTag<TTag extends ReactTag> = TTag extends React.ElementType
  ? Omit<React.ComponentProps<TTag>, 'ref'>
  : never;

export type OverrideTagProps<TTag extends ReactTag, Overrides = {}> = Omit<
  PropsOfTag<TTag>,
  keyof Overrides
> &
  Overrides;
