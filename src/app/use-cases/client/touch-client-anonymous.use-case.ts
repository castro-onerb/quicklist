import { Injectable } from '@nestjs/common';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import { ClientAnonymousRepository } from '@/app/repositories/client.repository';
import { ClientAnonymous } from '@/domain/client/entities/client-anonymous.entity';
import { Either, right } from '@/core/errors/either';

@Injectable()
export class TouchClientAnonymousUseCase {
  constructor(private readonly repo: ClientAnonymousRepository) {}

  async execute(id: string): Promise<Either<null, { client: ClientAnonymous }>> {
    const existing = await this.repo.findById(id);

    if (existing) {
      existing.updateLastSeen();
      await this.repo.save(existing);

      return right({ client: existing });
    }

    const newClient = ClientAnonymous.create(
      {
        lists: [],
      },
      new UniqueID(id)
    );
    await this.repo.save(newClient);

    return right({ client: newClient });
  }
}
