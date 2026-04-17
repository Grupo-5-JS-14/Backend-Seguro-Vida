import { Module } from '@nestjs/common';
import { PlanoService } from './service/plano.service';
import { PlanoController } from './controller/plano.controller';

@Module({
  providers: [PlanoService],
  controllers: [PlanoController]
})
export class PlanoModule {}
