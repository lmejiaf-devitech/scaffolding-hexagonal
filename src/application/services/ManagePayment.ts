/* eslint-disable quotes */
/* eslint-disable no-useless-constructor */

import { IServices } from '@commons/application/IServices';
import { ITransaccion } from '@domain/IResponseNotification';
import { ISendPaymentTo } from '@domain/ISendPaymentTo';
import { Payment } from '@domain/entities/Payment';
import { injectable, inject } from 'inversify';

@injectable()
export class ManagePaymentService implements IServices<Payment, Promise<ITransaccion>> {
  private iSendPaymentTo: ISendPaymentTo;

  constructor(
    @inject('SendNotification') private sendNotification: ISendPaymentTo,
  ) {
    this.iSendPaymentTo = sendNotification;
  }

  public async execute(paramas: Payment): Promise<ITransaccion> {
    const result = await this.iSendPaymentTo.send(paramas);
    return result;
  }
}
