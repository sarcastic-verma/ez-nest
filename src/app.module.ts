import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration, { config } from './config';
import * as redisStore from 'cache-manager-redis-store';
import { UserModule } from './user/user.module';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from './helpers/prisma/prisma.module';
import { SQSProducerModule } from './sqs/producer/sqs-producer.module';
import { SqsConsumerModule } from './sqs/consumer/sqs-consumer.module';
import { AuthMiddleware } from './helpers/middlewares/auth/auth.middleware';
import { FirebaseService } from './helpers/firebase/firebase.service';
import { PrismaHealthIndicator } from './utils/prisma.health';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      ignoreEnvFile: true, // this is used to add os level env variables
      cache: true, // increase the performance of ConfigService#get method accessing process.env.
    }),
    CacheModule.register({
      store: redisStore,
      isGlobal: true,
      host: config.redisHost,
      port: config.redisPort,
    }),
    SQSProducerModule,
    SqsConsumerModule,
    PrismaModule, // this is a global module
    UserModule,
    TerminusModule.forRoot({ errorLogStyle: 'pretty' }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService, PrismaHealthIndicator],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'user',
      method: RequestMethod.POST,
    });
  }
}
