import { ClientAnonymousRepository } from '@/app/repositories/client.repository';
import { ClientAnonymous } from '@/domain/client/entities/client-anonymous.entity';

export class InMemoryClientAnonymousRepository extends ClientAnonymousRepository {
  public items = new Map<string, ClientAnonymous>();

  async findById(id: string): Promise<ClientAnonymous | null> {
    return this.items.get(id) ?? null;
  }

  async save(client: ClientAnonymous): Promise<void> {
    this.items.set(client.id.toString(), client);
  }
}
