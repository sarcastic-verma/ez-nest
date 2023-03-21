import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageProducer } from './sqs-producer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SqsModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        await ConfigModule.envVariablesLoaded;
        return {
          consumers: [],
          producers: [
            {
              name: configService.get('producerQueueName'),
              queueUrl: configService.get('producerQueueUrl'),
              region: configService.get('awsRegion'),
            },
          ],
        };
      },
    }),
  ],
  controllers: [],
  providers: [MessageProducer],
  exports: [MessageProducer],
})
export class SQSProducerModule {}
