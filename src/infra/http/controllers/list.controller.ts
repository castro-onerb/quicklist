import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateListUseCase } from '@/app/use-cases/list/create-list.use-case';
import { AddItemInListUseCase } from '@/app/use-cases/list/add-item-in-list.use-case';
import { GetListsByClientUseCase } from '@/app/use-cases/list/get-lists-by-client.use-case';
import { ListAlreadyExistsError, ListNotFoundError } from '@/app/use-cases/list/errors';
import { ClientAuthGuard } from '../guards/client-auth.guard';
import { ClientId } from '../decorators/client-id.decorator';
import { ListPresenter } from '../presenters/list.presenter';

@Controller('lists')
export class ListController {
  constructor(
    private readonly createList: CreateListUseCase,
    private readonly addItem: AddItemInListUseCase,
    private readonly getClientLists: GetListsByClientUseCase
  ) {}

  @UseGuards(ClientAuthGuard)
  @Post()
  async create(@Body() body: { name: string }, @ClientId() clientId: string) {
    const result = await this.createList.execute({
      name: body.name,
      clientAnonymousId: clientId,
    });
    if (result.right()) {
      return { success: true, list_id: result.value.listId };
    }
    if (result.value instanceof ListAlreadyExistsError) {
      throw new HttpException(result.value.message, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(ClientAuthGuard)
  @Post(':listId/items')
  async addItemInList(
    @Param('listId') listId: string,
    @Body() body: { name: string; quantity: number },
    @ClientId() _clientId: string
  ) {
    const result = await this.addItem.execute({
      listId,
      name: body.name,
      quantity: body.quantity,
    });

    if (result.right()) {
      return { success: true, item_id: result.value.itemId };
    }
    if (result.value instanceof ListNotFoundError) {
      throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(ClientAuthGuard)
  @Get()
  async listMine(@ClientId() clientId: string) {
    const result = await this.getClientLists.execute(clientId);
    if (result.right()) {
      return result.value.lists.map((l) => ListPresenter.toHTTP(l));
    }
    return [];
  }
}
