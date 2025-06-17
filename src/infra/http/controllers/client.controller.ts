import { Controller, Patch, Param } from '@nestjs/common';
import { TouchClientAnonymousUseCase } from '@/app/use-cases/client/touch-client-anonymous.use-case';
import { ClientAnonymousPresenter } from '../presenters/client.presenter';

@Controller('clients/anonymous')
export class ClientController {
  constructor(private readonly touchClient: TouchClientAnonymousUseCase) {}

  @Patch(':id/touch')
  async touch(@Param('id') id: string) {
    const result = await this.touchClient.execute(id);
    if (result.right()) {
      return ClientAnonymousPresenter.toHTTP(result.value.client);
    }
    return null;
  }
}
