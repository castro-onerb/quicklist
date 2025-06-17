import { UniqueID } from '@/core/value-objects/unique-id.vo';

export interface ISaveProps {
  id: UniqueID;
  listId: string;
  name: string;
  quantity?: number;
  unit?: string;
  checked?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export abstract class ListItemRepository {
  abstract save(props: ISaveProps): Promise<void>;
}
