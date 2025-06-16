// infra/database/prisma/repositories/prisma-list.repository.ts

import { Injectable } from '@nestjs/common';
import { ListRepository } from '@/app/repositories/list.repository';
import { List } from '@/domain/list/entities/list.entity';
import { PrismaService } from '../../prisma.service';
import { ListMapper } from '../../mappers/list.mapper';

@Injectable()
export class PrismaListRepository implements ListRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findByName(name: string): Promise<List | null> {
    const raw = await this.prisma.shoppingList.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
      include: {
        items: {
          where: {
            deletedAt: null,
          },
        },
      },
    });

    if (!raw) return null;

    return ListMapper.toDomain(raw);
  }

  async findById(id: string): Promise<List | null> {
    const raw = await this.prisma.shoppingList.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!raw || raw.deletedAt) return null;

    return ListMapper.toDomain(raw);
  }

  async findManyByClientId(clientId: string): Promise<List[]> {
    const lists = await this.prisma.shoppingList.findMany({
      where: {
        clientAnonymousId: clientId,
        deletedAt: null,
      },
      include: {
        items: {
          where: {
            deletedAt: null,
          },
        },
      },
    });

    return lists.map((row) => ListMapper.toDomain(row));
  }

  async save(list: List): Promise<void> {
    const data = ListMapper.toPrisma(list);

    await this.prisma.shoppingList.upsert({
      where: { id: list.id.toString() },
      create: {
        ...data,
        items: {
          create: list.items.map((item) => ({
            id: item.id.toString(),
            name: item.name,
            quantity: item.quantity,
            created_at: item.createdAt,
            updated_at: item.updatedAt,
          })),
        },
      },
      update: {
        ...data,
        items: {
          // Estratégia básica: deleteAll + create again (ou pode implementar diff inteligente)
          deleteMany: {},
          create: list.items.map((item) => ({
            id: item.id.toString(),
            name: item.name,
            quantity: item.quantity,
            created_at: item.createdAt,
            updated_at: item.updatedAt,
          })),
        },
      },
      include: { items: true },
    });
  }
}
