/* eslint-disable import/extensions */

import { Payment } from '@domain/entities/Payment';

export interface IGetPaymentData {
  searchPaymentData(params: number): Promise<Payment>
}
