import { ListRepository } from '@/app/repositories/list.repository';
import { List } from '@/domain/list/entities/list.entity';

export class InMemoryListRepository extends ListRepository {
  public items = new Map<string, List>();

  async save(list: List): Promise<void> {
    this.items.set(list.id.toString(), list);
  }

  async findByName(name: string): Promise<List | null> {
    for (const list of this.items.values()) {
      if (list.name === name) return list;
    }
    return null;
  }

  async findById(id: string): Promise<List | null> {
    return this.items.get(id) ?? null;
  }

  async findManyByClientId(clientId: string): Promise<List[]> {
    const lists: List[] = [];
    for (const list of this.items.values()) {
      // access protected props via as any to read anonymousId
      if ((list as any)._props.anonymousId === clientId) {
        lists.push(list);
      }
    }
    return lists;
  }
}
