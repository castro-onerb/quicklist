// infra/database/prisma/mappers/list.mapper.ts

import { List } from '@/domain/list/entities/list.entity';
import { ListItem } from '@/domain/list/entities/list-item.entity';
import { UniqueID } from '@/core/value-objects/unique-id.vo';
import { Prisma } from '@prisma/client';

type PrismaShoppingListWithItems = Prisma.ShoppingListGetPayload<{
  include: { items: true };
}>;

export class ListMapper {
  static toDomain(raw: PrismaShoppingListWithItems): List {
    return List.create(
      {
        name: raw.name,
        source: raw.source ?? undefined,
        createdAt: raw.createdAt,
        anonymousId: raw.clientAnonymousId,
        deletedAt: raw.deletedAt ?? undefined,
        updatedAt: raw.updatedAt,
        items: raw.items.map((item) =>
          ListItem.create(
            {
              name: item.name,
              quantity: item.quantity,
              checked: item.checked,
              listId: item.listId,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt ?? undefined,
            },
            new UniqueID(item.id)
          )
        ),
      },
      new UniqueID(raw.id)
    );
  }

  static toPrisma(list: List) {
    return {
      id: list.id.toString(),
      name: list.name,
      source: list.source,
      deletedAt: list.deletedAt,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }
}
