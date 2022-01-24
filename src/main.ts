import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Auth REST API')
    .setVersion('1.0')
    .addTag('Auth api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/api/v1`, app, document);

  await app.listen(PORT);

  console.log(`Server run on port: ${PORT}`);
}

bootstrap().catch((err) => console.error('[Global Error]', err));
