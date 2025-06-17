import { Module } from '@nestjs/common';
import { TouchClientAnonymousUseCase } from '@/app/use-cases/client/touch-client-anonymous.use-case';
import { CreateListUseCase } from '@/app/use-cases/list/create-list.use-case';
import { AddItemInListUseCase } from '@/app/use-cases/list/add-item-in-list.use-case';
import { GetListsByClientUseCase } from '@/app/use-cases/list/get-lists-by-client.use-case';
import { CanCreateNewListPolicy } from '@/app/use-cases/list/policies/can-create-new-list.policy';
import { ClientController } from './controllers/client.controller';
import { ListController } from './controllers/list.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController, ListController],
  providers: [
    TouchClientAnonymousUseCase,
    CreateListUseCase,
    AddItemInListUseCase,
    GetListsByClientUseCase,
    CanCreateNewListPolicy,
  ],
})
export class HttpModule {}
