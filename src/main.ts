import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exceptions-filters/prisma.exception-filter';
import { CatchAllErrorsExceptionFilter } from './exceptions-filters/catch-all-errors.exception-filter';
import { InvalidRelationExceptionFilter } from './exceptions-filters/invalid-relation.exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new CatchAllErrorsExceptionFilter(httpAdapter),
    new PrismaExceptionFilter(),
    new InvalidRelationExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Deafy')
    .setDescription('API Deafy')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(4000);
}
bootstrap();
