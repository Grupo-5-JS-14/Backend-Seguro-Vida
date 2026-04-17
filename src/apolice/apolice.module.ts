import { Module } from '@nestjs/common';
import { ApoliceService } from './service/apolice.service';
import { ApoliceController } from './controller/apolice.controller';

@Module({
  providers: [ApoliceService],
  controllers: [ApoliceController]
})
export class ApoliceModule {}
