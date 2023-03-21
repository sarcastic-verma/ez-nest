import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageHandler } from './message-handler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [
    UserModule,
    SqsModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        await ConfigModule.envVariablesLoaded;
        return {
          producers: [],
          consumers: [
            {
              name: configService.get('consumerQueueName'),
              queueUrl: configService.get('consumerQueueUrl'),
              region: configService.get('awsRegion'),
            },
          ],
        };
      },
    }),
  ],
  controllers: [],
  providers: [MessageHandler],
})
export class SqsConsumerModule {}
