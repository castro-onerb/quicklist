import { List } from '@/domain/list/entities/list.entity';
import { ListItemPresenter } from './list-item.presenter';

export class ListPresenter {
  static toHTTP(list: List) {
    return {
      id: list.id.toString(),
      name: list.name,
      source: list.source,
      created_at: list.createdAt,
      updated_at: list.updatedAt,
      deleted_at: list.deletedAt,
      items: list.items.map((item) => ListItemPresenter.toHTTP(item)),
    };
  }
}
