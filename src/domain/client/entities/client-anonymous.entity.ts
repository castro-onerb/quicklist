import dayjs from '@/core/configs/dayjs.config';
import { Entity } from '@/core/entities/entity';
import { IClientAnonymousProps } from '../types/client-anonymous.interface';
import { List } from '@/domain/list/entities/list.entity';
import { UniqueID } from '@/core/value-objects/unique-id.vo';

export class ClientAnonymous extends Entity<IClientAnonymousProps> {
  get createdAt(): Date | undefined {
    return this._props.createdAt;
  }

  get lastSeenAt(): Date | undefined {
    return this._props.createdAt;
  }

  get lists(): List[] {
    return this._props.lists;
  }

  constructor(props: IClientAnonymousProps, id?: UniqueID) {
    super(props, id);
  }

  static create(props: IClientAnonymousProps, id?: UniqueID) {
    return new ClientAnonymous(
      {
        ...props,
        createdAt: props.createdAt ?? dayjs().toDate(),
      },
      id
    );
  }
}
