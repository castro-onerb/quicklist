import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryListRepository } from '../../in-memory/in-memory-list.repository';
import { CanCreateNewListPolicy } from '@/app/use-cases/list/policies/can-create-new-list.policy';
import { CreateListUseCase } from '@/app/use-cases/list/create-list.use-case';
import { ListAlreadyExistsError } from '@/app/use-cases/list/errors';
import { List } from '@/domain/list/entities/list.entity';

let repo: InMemoryListRepository;
let useCase: CreateListUseCase;

beforeEach(() => {
  repo = new InMemoryListRepository();
  const policy = new CanCreateNewListPolicy(repo);
  useCase = new CreateListUseCase(repo, policy);
});

describe('CreateListUseCase', () => {
  it('creates a list', async () => {
    const result = await useCase.execute({ name: 'Test' });
    expect(result.right()).toBe(true);
    expect(repo.items.size).toBe(1);
  });

  it('returns error when name already exists', async () => {
    const list = List.create({ name: 'Test', items: [], anonymousId: null });
    await repo.save(list);
    const result = await useCase.execute({ name: 'Test' });
    expect(result.left()).toBe(true);
    expect(result.value).toBeInstanceOf(ListAlreadyExistsError);
  });
});
