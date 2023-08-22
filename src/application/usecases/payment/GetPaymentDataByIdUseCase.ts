/* eslint-disable no-useless-constructor */
import { IUseCase } from '@commons/application/IUseCase';
import { PaymentDataNotFound } from '@domain/domain-exceptions/PaymentDataNotFound';
import { Payment } from '@domain/entities/Payment';
import { IGetPaymentData } from '@domain/repositories/IGetPaymentData';
import { CreatePaymentRequestDto } from '@presentation/api/server/express/dtos/PaymentNewsDto';
import { inject, injectable } from 'inversify';

@injectable()
export class GetPaymentDataByIdUseCase implements IUseCase<CreatePaymentRequestDto, Promise<Payment>> {
  private readonly getPaymentData: IGetPaymentData;

  constructor(@inject('GetPaymentData') private iGetPayment: IGetPaymentData) {
    this.getPaymentData = iGetPayment;
  }

  async execute(params: CreatePaymentRequestDto): Promise<Payment| null> {
    try {
      console.log('LLEGO AL USECASE');
      const result:Payment = await this.getPaymentData.searchPaymentData(params.identificadorMovimiento);
      if (!result) throw new PaymentDataNotFound();
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
