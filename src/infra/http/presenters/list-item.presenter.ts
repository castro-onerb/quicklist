import { ListItem } from '@/domain/list/entities/list-item.entity';

export class ListItemPresenter {
  static toHTTP(item: ListItem) {
    return {
      id: item.id.toString(),
      list_id: item.listId,
      name: item.name,
      quantity: item.quantity,
      created_at: item.createdAt,
      updated_at: item.updatedAt,
    };
  }
}
