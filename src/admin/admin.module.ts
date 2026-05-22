import { Module } from '@nestjs/common';
import { AdminController } from './controller/admin.controller';
import { ApoliceModule } from '../apolice/apolice.module';
import { PlanoModule } from '../plano/plano.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/constants';

@Module({
  imports: [
    ApoliceModule,
    PlanoModule,
    UsuarioModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AdminController],
})
export class AdminModule {}
