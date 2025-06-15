import dayjs from '@/core/configs/dayjs.config';
import { Entity } from '@/core/entities/entity';
import { IListItemProps } from '../types/list-item.interface';
import { UniqueID } from '@/core/value-objects/unique-id.vo';

export class ListItem extends Entity<IListItemProps> {
  get listId(): string {
    return this._props.listId;
  }

  get name(): string {
    return this._props.name;
  }

  get quantity(): number {
    return this._props.quantity;
  }

  constructor(props: IListItemProps, id?: UniqueID) {
    super(props, id);
  }

  static create(props: IListItemProps, id?: UniqueID) {
    return new ListItem(
      {
        ...props,
        createdAt: props.createdAt ?? dayjs().toDate(),
        updatedAt: props.updatedAt,
      },
      id
    );
  }
}
