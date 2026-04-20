import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Vittalis')
  .setDescription('Descomplicando o seguro de vida pra você')
  .setContact("Grupo 5","https://github.com/Grupo-5-JS-14","grupo_05-turma-javascript_14@outlook.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger',app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()

  process.env.TZ = '-03:00';
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
