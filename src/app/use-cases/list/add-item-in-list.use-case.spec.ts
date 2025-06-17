import { beforeEach, describe, expect, it } from 'vitest';
import { AddItemInListUseCase } from '@/app/use-cases/list/add-item-in-list.use-case';
import { List } from '@/domain/list/entities/list.entity';
import { ListNotFoundError } from '@/app/use-cases/list/errors';
import { InMemoryListRepository } from 'test/in-memory/in-memory-list.repository';
import { InMemoryListItemRepository } from 'test/in-memory/in-memory-list-item.repository';

let listRepo: InMemoryListRepository;
let itemRepo: InMemoryListItemRepository;
let useCase: AddItemInListUseCase;

beforeEach(() => {
  listRepo = new InMemoryListRepository();
  itemRepo = new InMemoryListItemRepository();
  useCase = new AddItemInListUseCase(listRepo, itemRepo);
});

describe('AddItemInListUseCase', () => {
  it('adds item into list', async () => {
    const list = List.create({ name: 'Test', items: [], anonymousId: null });
    await listRepo.save(list);
    const result = await useCase.execute({
      listId: list.id.toString(),
      name: 'Apple',
      quantity: 1,
    });
    expect(result.right()).toBe(true);
    expect(itemRepo.items.length).toBe(1);
  });

  it('returns error when list not found', async () => {
    const result = await useCase.execute({ listId: 'nope', name: 'Apple', quantity: 1 });
    expect(result.left()).toBe(true);
    expect(result.value).toBeInstanceOf(ListNotFoundError);
  });
});
