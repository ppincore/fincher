import { useEffect, useRef } from 'react';
import classNames from 'clsx';
import { Checkbox } from '@shared/ui/Checkbox';
import { ColumnDef } from '@tanstack/react-table';
import cls from './TableCheckbox.module.scss';

interface TableCheckboxProps {
  className?: string;
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const TableCheckbox = (props: TableCheckboxProps) => {
  const { className, checked, disabled, indeterminate, onChange } = props;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      if (!ref.current) {
        return;
      }
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [checked, indeterminate, ref]);

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <div className={classNames(cls.tableCheckbox, {}, [className])}>
      <Checkbox
        ref={ref}
        value={checked}
        disabled={disabled}
        onChange={(v, e) => {
          onChange?.(e);
        }}
      />
    </div>
  );
};

export function getColumnCheckbox<T>(): ColumnDef<T> {
  return {
    id: 'select',
    size: 48,
    header: ({ table }) => (
      <TableCheckbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <TableCheckbox
        checked={row.getIsSelected()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
        disabled={!row.getCanSelect()}
      />
    ),
  };
}

TableCheckbox.displayName = 'TableCheckbox';
