import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { nanoid } from 'nanoid/async';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessageProducer {
  constructor(
    private readonly sqsService: SqsService,
    private readonly configService: ConfigService,
  ) {}

  async sendMessage(body: Record<string, unknown>) {
    const message: string = JSON.stringify(body);

    try {
      await this.sqsService.send(this.configService.get('producerQueueName'), {
        body: message,
        id: await nanoid(),
      });
    } catch (error) {
      console.log('error in producing image!', error);
    }
  }
}
