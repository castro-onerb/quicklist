import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ListItemRepository, ISaveProps } from '@/app/repositories/list-item.repository';

@Injectable()
export class PrismaListItemRepository implements ListItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(props: ISaveProps): Promise<void> {
    await this.prisma.shoppingItem.upsert({
      where: {
        id: props.id, // id deve estar em ISaveProps
      },
      create: {
        id: props.id,
        name: props.name,
        quantity: props.quantity ?? 1,
        unit: props.unit ?? null,
        checked: props.checked ?? null,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
        listId: props.listId,
      },
      update: {
        name: props.name,
        quantity: props.quantity,
        unit: props.unit,
        checked: props.checked,
        updatedAt: props.updatedAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
      },
    });
  }
}
