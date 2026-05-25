import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Apolice } from './entities/apolice.entity';
import { ApoliceService } from './service/apolice.service';
import { ApoliceController } from './controller/apolice.controller';

import { Usuario } from '../usuario/entities/usuario.entity';
import { Plano } from '../plano/entities/plano.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Apolice,
      Usuario,
      Plano,
    ]),
  ],
  providers: [ApoliceService],
  controllers: [ApoliceController],
  exports: [ApoliceService],
})
export class ApoliceModule {}