/* eslint-disable no-useless-constructor */
import { ISendNotification } from '@domain/ISendNotification';
import { Payment } from '@domain/entities/Payment';
import { inject, injectable } from 'inversify';

@injectable()
export class SendPaymentTo {
  private readonly iSendNotification: ISendNotification;

  constructor(
    @inject('SendNotification') private sendNotification: ISendNotification,
  ) {
    this.iSendNotification = sendNotification;
  }

  async send(params: Payment): Promise<any> {
    const response = await this.iSendNotification.send(params);
    return response;
  }
}
