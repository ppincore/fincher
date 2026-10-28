import { ChipProps } from '@shared/ui/Chip';
import { FlexAlign } from '@shared/ui/Stack';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface TablePagination {
  pageIndex: number;
  pageSize: number;
}

interface TableBaseProps<T> {
  className?: string;
  data?: T[];
  columns: ColumnDef<T, T[keyof T]>[];
  totalCount?: number;
  pagination?: TablePagination;
  setPagination?: Dispatch<SetStateAction<TablePagination>>;
}

export interface NonSelectableTableProps<T> extends TableBaseProps<T> {
  selectable?: false;
}

export interface SelectableTableProps<T> extends TableBaseProps<T> {
  selectable: true;
  setSelectedRows: (selectedRows: T[]) => void;
}

export interface TableWithSelectionProps<T> {
  children: ReactNode;
  setSelectedRows: (selectedRows: T[]) => void;
  rowSelection: Record<string, boolean>;
  data?: T[];
}

export type TableProps<T> =
  | NonSelectableTableProps<T>
  | SelectableTableProps<T>;

// TableCell
interface TableCellBase {
  align?: FlexAlign;
  text?: string;
  translationNamespace?: string;
  isWithTranslation?: boolean;
}

export interface TableCellI extends TableCellBase {
  chip?: ChipProps;
}

export interface SortableTableHeaderCellI extends TableCellBase {
  sortable: true;
  sorted?: boolean;
  order?: 'asc' | 'desc';
}

export interface NotSortableTableHeaderCellI extends TableCellBase {
  sortable?: false;
}

export type TableHeaderCellI =
  | SortableTableHeaderCellI
  | NotSortableTableHeaderCellI;
