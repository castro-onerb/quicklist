import { Injectable } from '@nestjs/common';
import { ClientAnonymousRepository } from '@/app/repositories/client.repository';
import { ClientAnonymous } from '@/domain/client/entities/client-anonymous.entity';
import { PrismaService } from '../../prisma.service';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import { ListMapper } from '../../mappers/list.mapper';

@Injectable()
export class PrismaClientAnonymousRepository extends ClientAnonymousRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findById(id: string): Promise<ClientAnonymous | null> {
    const raw = await this.prisma.clientAnonymous.findUnique({
      where: { id },
      include: {
        lists: {
          where: {
            deletedAt: null,
          },
          include: {
            items: {
              where: {
                deletedAt: null,
              },
            },
          },
        },
      },
    });

    if (!raw) return null;

    return ClientAnonymous.create(
      {
        createdAt: raw.createdAt,
        lastSeenAt: raw.lastSeenAt,
        lists: raw.lists.map((row) => ListMapper.toDomain(row)),
      },
      new UniqueID(raw.id)
    );
  }

  async save(client: ClientAnonymous): Promise<void> {
    await this.prisma.clientAnonymous.upsert({
      where: { id: client.id.toString() },
      create: {
        id: client.id.toString(),
        createdAt: client.createdAt ?? new Date(),
        lastSeenAt: client.lastSeenAt ?? new Date(),
      },
      update: {
        lastSeenAt: client.lastSeenAt ?? new Date(),
      },
    });
  }
}
