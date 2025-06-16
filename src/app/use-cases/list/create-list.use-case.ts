import { Injectable } from '@nestjs/common';

import { ICreateListRequest, TCreateListResponse } from './types/create-list.interface';
import { ListRepository } from '@/app/repositories/list.repository';
import { List } from '@/domain/list/entities/list.entity';
import { CanCreateNewListPolicy } from './policies/can-create-new-list.policy';
import { left, right } from '@/core/errors/either';
import { ListAlreadyExistsError } from './errors';

@Injectable()
export class CreateListUseCase {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly policy: CanCreateNewListPolicy
  ) {}

  async execute({ name }: ICreateListRequest): Promise<TCreateListResponse> {
    const canCreate = await this.policy.execute({ name });

    if (!canCreate) {
      return left(new ListAlreadyExistsError());
    }

    const list = List.create({ name, items: [] });

    await this.listRepository.save(list);

    return right({
      success: true,
      listId: list.id.toString(),
    });
  }
}
