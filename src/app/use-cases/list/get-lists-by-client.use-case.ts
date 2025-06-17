import { Injectable } from '@nestjs/common';
import { ListRepository } from '@/app/repositories/list.repository';
import { List } from '@/domain/list/entities/list.entity';
import { Either, right } from '@/core/errors/either';

@Injectable()
export class GetListsByClientUseCase {
  constructor(private readonly repo: ListRepository) {}

  async execute(clientId: string): Promise<Either<null, { lists: List[] }>> {
    const lists = await this.repo.findManyByClientId(clientId);
    return right({ lists });
  }
}
