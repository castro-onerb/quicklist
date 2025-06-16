import { ClientAnonymousRepository } from '@/app/repositories/client.repository';
import { Module } from '@nestjs/common';
import { PrismaClientAnonymousRepository } from './prisma-anonymous-client.repository';

@Module({
  providers: [
    {
      provide: ClientAnonymousRepository,
      useClass: PrismaClientAnonymousRepository,
    },
  ],
})
export class ClientAnonymousModule {}
