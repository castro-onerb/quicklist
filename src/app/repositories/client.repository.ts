import { ClientAnonymous } from '@/domain/client/entities/client-anonymous.entity';

export abstract class ClientAnonymousRepository {
  abstract findById(id: string): Promise<ClientAnonymous | null>;
  abstract save(client: ClientAnonymous): Promise<void>;
}
