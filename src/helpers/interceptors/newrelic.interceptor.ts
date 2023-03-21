import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as newrelic from 'newrelic';
import { tap } from 'rxjs/operators';
import * as util from 'util';

@Injectable()
export class NewrelicInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(
      `Parent Interceptor before: ${util.inspect(context.getHandler().name)}`,
    );
    return newrelic.startWebTransaction(context.getHandler().name, () => {
      const transaction = newrelic.getTransaction();
      // const now = Date.now();
      return next.handle().pipe(
        tap(() => {
          console.log(
            `Parent Interceptor after: ${util.inspect(
              context.getHandler().name,
            )}`,
          );
          return transaction.end();
        }),
      );
    });
  }
}
