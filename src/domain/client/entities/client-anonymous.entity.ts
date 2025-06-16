import dayjs from '@/core/configs/dayjs.config';
import { IClientAnonymousProps } from '../types/client-anonymous.interface';
import { List } from '@/domain/list/entities/list.entity';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import { AggregateRoot } from '@/core/entities/aggregate-root';

export class ClientAnonymous extends AggregateRoot<IClientAnonymousProps> {
  get createdAt(): Date | undefined {
    return this._props.createdAt;
  }

  get lastSeenAt(): Date | undefined {
    return this._props.lastSeenAt;
  }

  get lists(): List[] {
    return [...this._props.lists];
  }

  constructor(props: IClientAnonymousProps, id?: UniqueID) {
    super(props, id);
  }

  static create(props: IClientAnonymousProps, id?: UniqueID) {
    const now = dayjs().toDate();

    return new ClientAnonymous(
      {
        ...props,
        createdAt: props.createdAt ?? now,
        lastSeenAt: props.lastSeenAt ?? now,
        lists: props.lists ?? [],
      },
      id
    );
  }

  updateLastSeen() {
    this._props.lastSeenAt = dayjs().toDate();
  }

  addList(list: List) {
    this._props.lists.push(list);
    this.updateLastSeen();
  }
}
