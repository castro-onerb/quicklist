import { ListRepository } from '@/app/repositories/list.repository';
import { Module } from '@nestjs/common';
import { PrismaListRepository } from './prisma-list.repository';
import { ListItemRepository } from '@/app/repositories/list-item.repository';
import { PrismaListItemRepository } from './prisma-list-item.repository';

@Module({
  providers: [
    {
      provide: ListRepository,
      useClass: PrismaListRepository,
    },
    {
      provide: ListItemRepository,
      useClass: PrismaListItemRepository,
    },
  ],
})
export class ListModule {}
