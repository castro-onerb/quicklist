export interface IListItemProps {
  listId: string;
  name: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
