import { Body, Controller, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateListUseCase } from '@/app/use-cases/list/create-list.use-case';
import { AddItemInListUseCase } from '@/app/use-cases/list/add-item-in-list.use-case';
import { ListAlreadyExistsError, ListNotFoundError } from '@/app/use-cases/list/errors';

@Controller('lists')
export class ListController {
  constructor(
    private readonly createList: CreateListUseCase,
    private readonly addItem: AddItemInListUseCase
  ) {}

  @Post()
  async create(@Body() body: { name: string }) {
    const result = await this.createList.execute({ name: body.name });
    if (result.right()) {
      return { success: true, list_id: result.value.listId };
    }
    if (result.value instanceof ListAlreadyExistsError) {
      throw new HttpException(result.value.message, HttpStatus.CONFLICT);
    }
  }

  @Post(':listId/items')
  async addItemInList(
    @Param('listId') listId: string,
    @Body() body: { name: string; quantity: number }
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
}
