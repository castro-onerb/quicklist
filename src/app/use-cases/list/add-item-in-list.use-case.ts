import { Injectable } from '@nestjs/common';

import { ListItemRepository } from '@/app/repositories/list-item.repository';
import { ListRepository } from '@/app/repositories/list.repository';
import { IAddItemInListRequest, TAddItemInListResponse } from './types/add-item-in-list.interface';
import { left, right } from '@/core/errors/either';
import { ListNotFoundError } from './errors';
import { ListItem } from '@/domain/list/entities/list-item.entity';
import dayjs from '@/core/configs/dayjs.config';

@Injectable()
export class AddItemInListUseCase {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly listItemRepository: ListItemRepository
  ) {}

  async execute({
    listId,
    name,
    quantity,
  }: IAddItemInListRequest): Promise<TAddItemInListResponse> {
    const listExists = await this.listRepository.findById(listId);

    if (!listExists) {
      return left(new ListNotFoundError());
    }

    const listItem = ListItem.create({
      listId,
      name,
      quantity,
      checked: null,
      createdAt: dayjs().toDate(),
    });

    await this.listItemRepository.save(listItem);

    return right({
      success: true,
      itemId: listItem.id.toString(),
    });
  }
}
