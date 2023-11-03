import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Books and Authors API')
    .setDescription('The books and authors API description')
    .setVersion('1.0')
    .addTag('Books', 'Endpoints related to books')
    .addTag('Authors', 'Endpoints related to authors')
    .addTag('Auth', 'Endpoints related to authentication')
    .addTag('Users', 'Endpoints related to users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
