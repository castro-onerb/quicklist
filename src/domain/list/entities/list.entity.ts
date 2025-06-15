import { Entity } from '@/core/entities/entity';
import { IListProps } from '../types/list.interface';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import dayjs from '@/core/configs/dayjs.config';

export class List extends Entity<IListProps> {
  get name(): string {
    return this._props.name;
  }

  constructor(props: IListProps, id?: UniqueID) {
    super(props, id);
  }

  static create(props: IListProps, id?: UniqueID) {
    return new List(
      {
        ...props,
        createdAt: props.createdAt ?? dayjs().toDate(),
        updatedAt: props.updatedAt,
      },
      id
    );
  }
}
