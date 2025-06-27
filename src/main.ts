import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  const config = new DocumentBuilder()
    .setTitle('Online Course API')
    .setDescription('Backend for course management')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
