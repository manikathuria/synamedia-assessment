import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './allExceptionFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const log = new Logger('App');
  log.log(`Server Environment: ${process.env.NODE_ENV}`);
  let appLogger = null;

  if (process.env.NODE_ENV === 'development') {
    appLogger = WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.json(),
            winston.format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            })
          )
        })
      ],
      level: 'debug'
    });
  } else {
    appLogger = WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.uncolorize(),
            winston.format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            })
          )
        })
      ],
      level: 'debug'
    });
  }

  const app = await NestFactory.create(AppModule, {
    logger: appLogger,
    rawBody: true
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = app.get(ConfigService);

  // Global Error Handling
  // Catches unhandled rejections so the app doesn't crash
  process.on('unhandledRejection', (reason, promise) => {
    log.error('unhandledRejection', reason);
    log.error(reason);
  });

  process.on('uncaughtException', (err) => {
    log.error('uncaughtException', err);
  });

  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  // app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI
  });

  if (config.get('swagger.enabled')) {
    // Swagger
    const swaggerApi = new DocumentBuilder()
      .setTitle(config.get('swagger.title'))
      .setDescription(config.get('swagger.description'))
      .setVersion(config.get('swagger.version'))
      .build();

    const document = SwaggerModule.createDocument(app, swaggerApi);
    SwaggerModule.setup('/docs', app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
