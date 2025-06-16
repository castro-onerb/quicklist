import { List } from '@/domain/list/entities/list.entity';

interface ISaveProps {
  name: string;
}

export abstract class ListRepository {
  abstract save(props: ISaveProps): Promise<void>;
  abstract findByName(name: string): Promise<List | null>;
  abstract findById(id: string): Promise<List | null>;
}
