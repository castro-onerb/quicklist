import { List } from '@/domain/list/entities/list.entity';

export interface IClientAnonymousProps {
  createdAt?: Date;
  lastSeenAt?: Date;
  lists: List[];
}
