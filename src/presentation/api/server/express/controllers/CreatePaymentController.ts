/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { inject, injectable } from 'inversify';
import { IServices } from '@commons/application/IServices';
import { Payment } from '@domain/entities/Payment';
import { ITransaccion } from '@domain/IResponseNotification';
import { IUseCase } from '@commons/application/IUseCase';
import { GeneralApiResponse } from '@commons/presentation/GeneralApiResponse';
import { PaymentDataNotFound } from '@domain/domain-exceptions/PaymentDataNotFound';
import { ExceededPaymentRetries } from '@domain/domain-exceptions/ExceededPaymentRetries';
import { CreatePaymentRequestDto, CreatePaymentSuccessDto } from '../dtos/PaymentNewsDto';

@injectable()
export class CreatePaymentController {
  iGetPaymentDataByIdUseCase: IUseCase<CreatePaymentRequestDto, Promise<Payment>>;

  iManagePayment: IServices<Payment, Promise<ITransaccion>>;

  iSendContingenciaUseCase: IUseCase<Payment, Promise<any>>;

  constructor(
    @inject('GetPaymentDataByIdUseCase') private getPaymentData: IUseCase<CreatePaymentRequestDto, Promise<Payment>>,
    @inject('ManagePaymentService') private managePayment: IServices<Payment, Promise<ITransaccion>>,
    @inject('SendContingenciaUseCase') private sendContingencia: IUseCase<Payment, Promise<any>>,
  ) {
    this.iGetPaymentDataByIdUseCase = getPaymentData;
    this.iManagePayment = managePayment;
    this.iSendContingenciaUseCase = sendContingencia;
  }

  execute = async(createPaymentDto: CreatePaymentRequestDto): Promise<CreatePaymentSuccessDto | GeneralApiResponse> => {
    try {
      console.log('🚀 ~ file: CreatePaymentController.ts:26 ~ CreatePaymentController ~ execute=async ~ createPaymentDto:', createPaymentDto);
      console.log('LLEGO AL CONTROLLER');
      const data = await this.iGetPaymentDataByIdUseCase.execute(createPaymentDto);
      const result = await this.iManagePayment.execute(data);
      if (result.estadoPago === 'PENDIENTE' && result.codigoHttp === 201) {
        const result = await this.iSendContingenciaUseCase.execute(data);
        return {
          technicalCode    : 200,
          responseData     : { ...result },
          technicalMessage : 'OK',
          responseDate     : new Date(),

        };
      }
      return {
        technicalCode    : 200,
        responseData     : { ...result },
        technicalMessage : 'OK',
        responseDate     : new Date(),
      } as any;
    } catch (error) {
      if (error instanceof PaymentDataNotFound || error instanceof ExceededPaymentRetries) {
        return {
          technicalCode    : 400,
          technicalMessage : error.message,
          responseDate     : new Date(),
        };
      }
      return {
        technicalCode    : 500,
        technicalMessage : 'Error en el servidor',
        responseDate     : new Date(),
      };
    }
  };
}
