import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from '../auth/auth.module';
import { UsuarioService } from './service/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { Bcrypt } from '../utils/bcrypt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsuarioService, Bcrypt],
  controllers: [UsuarioController],
  exports: [UsuarioService, Bcrypt],
})
export class UsuarioModule {}