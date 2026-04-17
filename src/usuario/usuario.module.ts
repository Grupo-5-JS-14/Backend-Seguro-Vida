import { Module } from '@nestjs/common';
import { UsuarioService } from './service/usuario.service';
import { UsuarioController } from './controller/usuario.controller';

@Module({
  providers: [UsuarioService],
  controllers: [UsuarioController]
})
export class UsuarioModule {}
