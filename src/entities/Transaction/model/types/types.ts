import { ListResponse, SearchParams } from '@shared/types/api';
import { AccountEntity } from '@entities/Account';
import { TransactionType } from '../const/const';

export interface IEntity {
  id: string;
  transactionType?: TransactionType;
  dateTime?: string;
  description?: string;
  amount: string;
  accountId?: string;
  account?: AccountEntity;
}

interface IFormBasics extends Omit<IEntity, 'id' | 'account' | 'dateTime'> {
  dateTime?: Date;
}

interface IFormIncome extends IFormBasics {
  transactionType: TransactionType.INCOME;
  source?: string;
}

interface IFormExpense extends IFormBasics {
  transactionType: TransactionType.EXPENSE;
  fn?: number;
  fp?: number;
  fd?: number;
}

export type IForm = IFormExpense | IFormIncome;

export namespace API {
  export type Filter = Pick<
    IEntity,
    'transactionType' | 'dateTime' | 'accountId'
  >;
  export type SortKeys = keyof Omit<IEntity, 'description'> | 'createdAt';

  export type EntityResponse = IEntity;
  export type ListEntityResponse = ListResponse<IEntity>;
  export type RequestParams = SearchParams<IEntity, Filter, SortKeys>;
  //   export type CreateRequest = ;
  //   export type UpdateRequest = { id: string; entity:  };
  export type DeleteData = string;
}
