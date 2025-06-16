import { Module } from '@nestjs/common';
import { ListModule } from './repositories/list/list.module';
import { ClientAnonymousModule } from './repositories/client/client.module';

@Module({
  imports: [ListModule, ClientAnonymousModule],
  exports: [ListModule, ClientAnonymousModule],
})
export class PrismaModule {}
