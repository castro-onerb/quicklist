import { ListItemRepository, ISaveProps } from '@/app/repositories/list-item.repository';

export class InMemoryListItemRepository extends ListItemRepository {
  public items: ISaveProps[] = [];

  async save(props: ISaveProps): Promise<void> {
    const index = this.items.findIndex((i) => i.id === props.id);
    if (index >= 0) {
      this.items[index] = props;
    } else {
      this.items.push(props);
    }
  }
}
