import { beforeEach, describe, expect, it } from 'vitest';
import { GetListsByClientUseCase } from '@/app/use-cases/list/get-lists-by-client.use-case';
import { InMemoryListRepository } from 'test/in-memory/in-memory-list.repository';
import { List } from '@/domain/list/entities/list.entity';

let repo: InMemoryListRepository;
let useCase: GetListsByClientUseCase;

beforeEach(() => {
  repo = new InMemoryListRepository();
  useCase = new GetListsByClientUseCase(repo);
});

describe('GetListsByClientUseCase', () => {
  it('returns lists for client', async () => {
    const l1 = List.create({ name: 'A', items: [], anonymousId: 'c1' });
    const l2 = List.create({ name: 'B', items: [], anonymousId: 'c1' });
    const l3 = List.create({ name: 'C', items: [], anonymousId: 'c2' });
    await repo.save(l1);
    await repo.save(l2);
    await repo.save(l3);

    const result = await useCase.execute('c1');
    expect(result.right()).toBe(true);
    expect(result.value.lists.length).toBe(2);
  });
});
