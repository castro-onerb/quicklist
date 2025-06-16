import { ListItem } from '../entities/list-item.entity';

export interface IListProps {
  name: string;
  source?: string;
  items?: ListItem[] | null;
  anonymousId: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
