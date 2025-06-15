import { Injectable } from '@nestjs/common';
import { ICreateListRequest } from './types/create-list.interface';
import { ListRepository } from '@/app/repositories/list.repository';
import { List } from '@/domain/list/entities/list.entity';

@Injectable()
export class CreateListUseCase {
  constructor(private readonly useRepo: ListRepository) {}

  async execute({ name }: ICreateListRequest) {
    const list = List.create({
      name,
    });

    const result = await this.useRepo.save({ name: list.name });
  }
}
