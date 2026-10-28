type ErrorData = Partial<{
  message: string;
}>;

export type FetchBaseQueryErrorCustom = {
  status: number;
  data?: ErrorData;
};

export interface ListResponse<T> {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  items: T[];
}

export type SearchParams<
  TEntity extends Object,
  TSearch = TEntity,
  SortKeys = keyof TEntity,
> = {
  pageSize?: number;
  page?: number;
  sort?: 'ASC' | 'DESC';
  sortBy?: SortKeys | 'createdAt';
  ids?: string[];
} & {
  [P in keyof TSearch]?: TSearch[P];
};
