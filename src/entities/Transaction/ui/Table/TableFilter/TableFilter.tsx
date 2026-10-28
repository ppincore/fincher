import { memo, useMemo, useState } from 'react';
import classNames from 'clsx';
import { HStack } from '@shared/ui/Stack';
import { Input } from '@shared/ui/Input';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { Drawer, DrawerFooterProps } from '@shared/ui/Drawer';
import { CreateEntityButton } from '../../CreateEntity/CreateEntityButton';
import cls from './TableFilter.module.scss';
import { FilterForm } from '../FilterForm/FilterForm';
import { FormId } from '../../../model/const/const';

interface TableFilterProps {
  className?: string;
}

export const TableFilter = memo(function TableFilter(props: TableFilterProps) {
  const { className } = props;

  const { t } = useTranslation();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const footerProps = useMemo<DrawerFooterProps>(
    () => ({
      outlineBtn: {
        form: FormId.FILTER,
        text: t('Reset'),
        onClick: () => {
          setIsFilterOpen(false);
        },
        type: 'reset',
      },
      primaryBtn: {
        form: FormId.FILTER,
        text: t('Apply'),
        onClick: () => {
          setIsFilterOpen(false);
        },
        type: 'submit',
      },
    }),
    [t],
  );

  return (
    <>
      <HStack
        max
        align="center"
        gap="8"
        className={classNames(cls.tableFilter, {}, [className])}
      >
        <Input placeholder={t('Search')} className={cls.search} />
        <HStack className={cls.btns} gap="8">
          <Button
            onClick={() => setIsFilterOpen(true)}
            theme={ButtonTheme.OUTLINE}
            size={ButtonSize.M}
          >
            {t('Filter')}
          </Button>
          <CreateEntityButton isShort />
        </HStack>
      </HStack>
      <Drawer
        title={t('Filters')}
        footerProps={footerProps}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <FilterForm />
      </Drawer>
    </>
  );
});

TableFilter.displayName = 'TableFilter';
