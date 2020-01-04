import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      response.status(404).json({found: false});
  }
}
