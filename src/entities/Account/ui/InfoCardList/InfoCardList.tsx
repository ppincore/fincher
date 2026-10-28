import { memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { AddAccountButtonCard } from '../AddAccountButtonCard/AddAccountButtonCard';
import { apiHooks } from '../../api/api';
import cls from './InfoCardList.module.scss';
import { InfoCard } from '../InfoCard/InfoCard';
import { CreateAccount } from '../CreateAccount/CreateAccount';

interface InfoCardListProps {
  className?: string;
  addable?: boolean;
}

export const InfoCardList = memo(function InfoCardList(
  props: InfoCardListProps,
) {
  const { className, addable } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardListRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);

  const checkScroll = () => {
    const cardList = cardListRef.current;
    if (cardList) {
      setHasScroll(cardList.scrollWidth > cardList.clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();

    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(checkScroll);
    if (cardListRef.current) {
      observer.observe(cardListRef.current, { childList: true, subtree: true });
    }
    return () => observer.disconnect();
  }, []);

  const { data: accountsList } = apiHooks.useListEntities();

  return (
    <div
      ref={wrapperRef}
      className={clsx(cls.scrollWrapper, className, {
        [cls.hasScroll]: hasScroll,
      })}
    >
      <div ref={cardListRef} className={clsx(cls.cardList)}>
        {accountsList?.items.map((entityData) => (
          <InfoCard
            type="neutral"
            entityData={entityData}
            key={entityData.id}
          />
        ))}
        {addable && <CreateAccount Trigger={AddAccountButtonCard} />}
      </div>
    </div>
  );
});
