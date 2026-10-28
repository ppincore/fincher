import { Fragment, ReactNode, memo } from 'react';
import { Menu as HMenu, Transition } from '@headlessui/react';
import classNames from 'clsx';
import { PopupMenuItem } from '../PopupMenuItem/PopupMenuItem';
import { IPopupMenuItem } from '../../types/popupMenu';
import cls from './PopupMenu.module.scss';

interface PopupMenuProps {
  trigger: ReactNode;
  className?: string;
  items: IPopupMenuItem[];
}

export const PopupMenu = memo(function PopupMenu(props: PopupMenuProps) {
  const { className, trigger, items } = props;

  return (
    <HMenu as="div" className={classNames(cls.popupMenu, className)}>
      <HMenu.Button as="ul" className={cls.trigger}>
        {trigger}
      </HMenu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HMenu.Items className={classNames(cls.menu)}>
          {items?.map((item) => {
            const { text, icon, onClick } = item;

            return (
              <HMenu.Item key={text}>
                {() => (
                  <PopupMenuItem text={text} onClick={onClick} icon={icon} />
                )}
              </HMenu.Item>
            );
          })}
        </HMenu.Items>
      </Transition>
    </HMenu>
  );
});

PopupMenu.displayName = 'PopupMenu';
