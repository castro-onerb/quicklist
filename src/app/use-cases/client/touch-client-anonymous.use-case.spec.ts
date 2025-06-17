import { describe, it, expect, beforeEach } from 'vitest';
import { TouchClientAnonymousUseCase } from '@/app/use-cases/client/touch-client-anonymous.use-case';
import { ClientAnonymous } from '@/domain/client/entities/client-anonymous.entity';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import { InMemoryClientAnonymousRepository } from 'test/in-memory/in-memory-client.repository';

let repo: InMemoryClientAnonymousRepository;
let useCase: TouchClientAnonymousUseCase;

beforeEach(() => {
  repo = new InMemoryClientAnonymousRepository();
  useCase = new TouchClientAnonymousUseCase(repo);
});

describe('TouchClientAnonymousUseCase', () => {
  it('creates a new client when not exists', async () => {
    const result = await useCase.execute('abc');
    expect(result.right()).toBe(true);
    expect(repo.items.get('abc')).toBeTruthy();
  });

  it('updates last seen for existing client', async () => {
    const client = ClientAnonymous.create({ lists: [] }, new UniqueID('abc'));
    await repo.save(client);
    const lastSeen = client.lastSeenAt;
    await new Promise((r) => setTimeout(r, 10));
    const result = await useCase.execute('abc');
    expect(result.right()).toBe(true);
    const stored = repo.items.get('abc')!;
    expect(stored.lastSeenAt).toBeDefined();
    expect(stored.lastSeenAt!.getTime()).toBeGreaterThan((lastSeen ?? new Date(0)).getTime());
  });
});
