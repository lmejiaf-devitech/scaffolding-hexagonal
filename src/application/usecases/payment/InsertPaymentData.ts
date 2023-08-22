import { injectable } from 'inversify';

/* eslint-disable no-useless-constructor */
@injectable()
export class InsertPaymentData {
  constructor(
    private readonly insertPayment: InsertPaymentData,
  ) {}

  async run(params: any): Promise<any> {
    const result = await this.insertPayment.run(params);
    return result;
  }
}
