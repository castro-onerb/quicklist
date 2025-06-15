import { ListItem } from '../entities/list-item.entity';

export interface IListProps {
  name: string;
  items?: ListItem[] | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
