import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const serverConfig = {
  PORT: process.env.PORT,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Auth REST API')
    .setVersion('1.0')
    .addTag('Auth api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/api/v1`, app, document);

  app.use((req, res, next) => {
    if (req.method === 'GET' && req.path === '/healthcheck') {
      res.status(200).send('OK');
      return;
    }
    next();
  });

  await app.listen(serverConfig.PORT);

  console.log(`Server run on port: ${serverConfig.PORT}`);
}

bootstrap().catch((err) => console.error('[Global Error]', err));
