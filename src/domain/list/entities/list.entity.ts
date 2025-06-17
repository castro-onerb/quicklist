import { IListProps } from '../types/list.interface';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import dayjs from '@/core/configs/dayjs.config';
import { AggregateRoot } from '@/core/entities/aggregate-root';
import { ListItem } from './list-item.entity';

export class List extends AggregateRoot<IListProps> {
  get name(): string {
    return this._props.name;
  }

  get items(): ListItem[] {
    return this._props.items ?? [];
  }

  get source() {
    return this._props.source;
  }

  get clientId() {
    return this._props.anonymousId;
  }

  get createdAt() {
    return this._props.createdAt;
  }

  get updatedAt() {
    return this._props.updatedAt;
  }

  get deletedAt() {
    return this._props.deletedAt;
  }

  constructor(props: IListProps, id?: UniqueID) {
    super(props, id);
  }

  static create(props: IListProps, id?: UniqueID) {
    return new List(
      {
        ...props,
        name: props.name ?? `Nova Lista - ${dayjs().format('DD/MM HH:mm')}`,
        items: props.items ?? [],
        createdAt: props.createdAt ?? dayjs().toDate(),
        updatedAt: props.updatedAt,
      },
      id
    );
  }

  addItem(item: ListItem) {
    this._props.items?.push(item);
    this._props.updatedAt = dayjs().toDate();
  }

  removeItem(itemId: UniqueID) {
    this._props.items = this._props.items
      ? this._props.items.filter((item) => item.id !== itemId)
      : [];
    this._props.updatedAt = dayjs().toDate();
  }
}
