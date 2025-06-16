export interface IListItemProps {
  listId: string;
  name: string;
  quantity: number;
  checked: Date | null;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
