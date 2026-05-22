import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { PlanoModule } from './plano/plano.module';
import { ApoliceModule } from './apolice/apolice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.services';
import { AdminModule } from './admin/admin.module';
import { DevService } from './data/services/dev.services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule]
    }),
    UsuarioModule,
    PlanoModule,
    AuthModule, 
    ApoliceModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
