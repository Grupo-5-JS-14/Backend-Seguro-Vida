import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PlanoModule } from './plano/plano.module';
import { ApoliceModule } from './apolice/apolice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { Plano } from './plano/entities/plano.entity';
import { Apolice } from './apolice/entities/apolice.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '159875321',
      database: 'db_segurovida',
      entities: [Usuario, Plano, Apolice],
      synchronize: true,
    }),

    UsuarioModule,
    PlanoModule,
    AuthModule, 
    ApoliceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}