/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import { Payment } from '@domain/entities/Payment';
import { inject } from 'inversify';
import { InsertPaymentData } from '@domain/repositories/InsertPaymentData';
import { CoreDatabase } from '../Database/CoreDatabase';

export class InsertPayment implements InsertPaymentData {
  private iCoreDatabase: CoreDatabase;

  constructor(@inject('CoreDatabase') private coreDatabase: any) {
    this.iCoreDatabase = coreDatabase;
  }

  async run(paramas: Payment): Promise<any> {
    console.log('LLEGO AL INSERT');
  }
}
