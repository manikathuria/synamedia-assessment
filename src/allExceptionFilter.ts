import { Logger } from '@nestjs/common';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger('App');
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // const responseBody = {
    //   code: httpStatus,
    //   message: exception?.message || 'Internal Server Error',
    //   data: {}
    // };

    this.logger.debug(
      `headers :${JSON?.stringify(ctx?.getRequest()?.headers)} body :${JSON?.stringify(ctx?.getRequest()?.body)} url :${ctx?.getRequest()?.originalUrl} statusCode :${httpStatus} userId :${ctx?.getRequest()?.user?.id} `
    );
    httpAdapter.reply(
      ctx.getResponse(),
      { message: exception?.message ?? "some error occured" },
      httpStatus
    );

    if (httpStatus >= 500 && exception instanceof HttpException) {
      this.logger.error(exception, exception?.stack);
    } else if (!(exception instanceof HttpException)) {
      this.logger.error(`not an httpexception:  ${JSON.stringify(exception)}`);
    }
  }
}
