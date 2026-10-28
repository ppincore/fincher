import { Currency } from '@shared/const/money';
import { ListResponse, SearchParams } from '@shared/types/api';

export interface IEntity {
  id: string;
  userId: string;
  name: string;
  balance: string;
  currency: Currency;
}

export interface IForm extends Pick<IEntity, 'currency' | 'name'> {
  balance: number;
}
export namespace API {
  export type EntityResponse = IEntity;
  export type ShortListEntityResponse = IEntity[];
  export type ListEntityResponse = ListResponse<IEntity>;
  export type RequestParams = SearchParams<
    IEntity,
    Pick<IEntity, 'name' | 'currency' | 'userId'>,
    keyof Omit<IEntity, 'userId'>
  >;
  //   export type CreateRequest = ;
  //   export type UpdateRequest = { id: string; entity:  };
  //   export type DeleteData = ;
}
