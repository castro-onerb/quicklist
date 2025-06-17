import { ClientAnonymous } from '@/domain/client/entities/client-anonymous.entity';
import { ListPresenter } from './list.presenter';

export class ClientAnonymousPresenter {
  static toHTTP(client: ClientAnonymous) {
    return {
      id: client.id.toString(),
      created_at: client.createdAt,
      last_seen_at: client.lastSeenAt,
      lists: client.lists.map((list) => ListPresenter.toHTTP(list)),
    };
  }
}
