import { Either } from '@/core/errors/either';
import { ListAlreadyExistsError } from '../errors';

export interface ICreateListRequest {
  name: string;
}
interface CreateListSuccess {
  success: boolean;
  listId: string;
}

export type TCreateListResponse = Either<ListAlreadyExistsError, CreateListSuccess>;
