import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './service/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { Bcrypt } from '../auth/bycript/bycript';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
  ],
  providers: [UsuarioService, Bcrypt],
  controllers: [UsuarioController],
  exports: [UsuarioService, Bcrypt],
})
export class UsuarioModule {}