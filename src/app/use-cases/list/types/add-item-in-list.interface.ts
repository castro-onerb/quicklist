import { Either } from '@/core/errors/either';
import { ListNotFoundError } from '../errors';

export interface IAddItemInListRequest {
  listId: string;
  name: string;
  quantity: number;
}

export type TAddItemInListResponse = Either<
  ListNotFoundError,
  {
    success: boolean;
    itemId: string;
  }
>;
