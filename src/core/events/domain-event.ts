import { UniqueID } from '../value-objects/unique-id.vo';

export interface DomainEvent {
  ocurredAt: Date;
  aggregateId: UniqueID;
}
