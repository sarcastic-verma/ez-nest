import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { config } from '../../config';
import { Message } from '@aws-sdk/client-sqs';
import { UserService } from '../../user/user.service';

@Injectable()
export class MessageHandler {
  constructor(private readonly userService: UserService) {}
  async cronWrapper(name: string, cb: () => Promise<void>): Promise<number> {
    console.info(`Starting the cron: ${name}`);

    let retryCount = 0;

    while (retryCount < 3) {
      try {
        if (retryCount < 3) {
          await cb();
          break;
        } else {
          retryCount++;
          // todo: push the cron to either DB or DLQ
        }
      } catch (e) {
        retryCount++;
        console.error(
          `Got the following error while executing cron ${name} at ${retryCount} execution`,
          e,
        );
      }
    }

    console.info(`Executed the cron: ${name} in ${retryCount} tries`);
    return retryCount;
  }

  @SqsMessageHandler(config.consumerQueueName, false)
  async handleMessage(message: Message) {
    const body = JSON.parse(message.Body) as { cronName: string };
    const cronName = body.cronName;

    switch (cronName) {
      case 'fb_updateEventCount':
        await this.cronWrapper(cronName, this.userService.updateEventCount);
        break;
      default:
        break;
    }

    return;
  }
}
