import { List } from '@/domain/list/entities/list.entity';

export abstract class ListRepository {
  abstract save(list: List): Promise<void>;
  abstract findByName(name: string): Promise<List | null>;
  abstract findById(id: string): Promise<List | null>;
  abstract findManyByClientId(clientId: string): Promise<List[]>;
}
