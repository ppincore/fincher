import { memo } from 'react';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { IconFilePlus } from '@shared/assets/icons';
import { CreateEntity } from './CreateEntity';

interface CreateEntityButtonProps {
  className?: string;
  isShort?: boolean;
}

const Trigger = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();
  return (
    <Button
      theme={ButtonTheme.PRIMARY}
      size={ButtonSize.L}
      addonLeft={<IconFilePlus />}
      onClick={onClick}
    >
      {t('Add transaction')}
    </Button>
  );
};

const ShortTrigger = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();
  return (
    <Button theme={ButtonTheme.PRIMARY} size={ButtonSize.M} onClick={onClick}>
      {t('Create')}
    </Button>
  );
};

export const CreateEntityButton = memo(function CreateEntityButton(
  props: CreateEntityButtonProps,
) {
  const { className, isShort } = props;
  let TriggerButton = Trigger;
  if (isShort) {
    TriggerButton = ShortTrigger;
  }

  return <CreateEntity Trigger={TriggerButton} className={className} />;
});

CreateEntityButton.displayName = 'CreateEntityButton';
