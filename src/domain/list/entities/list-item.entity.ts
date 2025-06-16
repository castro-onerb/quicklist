import dayjs from '@/core/configs/dayjs.config';
import { IListItemProps } from '../types/list-item.interface';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import { AggregateRoot } from '@/core/entities/aggregate-root';

export class ListItem extends AggregateRoot<IListItemProps> {
  get listId(): string {
    return this._props.listId;
  }

  get name(): string {
    return this._props.name;
  }

  get quantity(): number {
    return this._props.quantity;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._props.updatedAt;
  }

  rename(newName: string) {
    this._props.name = newName.trim();
    this._props.updatedAt = dayjs().toDate();
  }

  updateQuantity(newQuantity: number) {
    if (newQuantity <= 0) {
      throw new Error('A quantidade deve ser maior que zero');
    }

    this._props.quantity = newQuantity;
    this._props.updatedAt = dayjs().toDate();
  }

  constructor(props: IListItemProps, id?: UniqueID) {
    super(props, id);
  }

  static create(props: IListItemProps, id?: UniqueID) {
    if (!props.name || props.name.trim() === '') {
      throw new Error('O nome do item é obrigatório');
    }

    if (props.quantity <= 0) {
      throw new Error('A quantidade deve ser maior que zero');
    }

    return new ListItem(
      {
        ...props,
        name: props.name.trim(),
        createdAt: props.createdAt ?? dayjs().toDate(),
        updatedAt: props.updatedAt,
      },
      id
    );
  }
}
