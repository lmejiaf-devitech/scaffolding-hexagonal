/* eslint-disable max-len */
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
import { BussinessInternalError } from '@domain/domain-exceptions/BussinessInternalError';
import { Retries } from '@domain/entities/Retries';
import { Parameters } from '@domain/entities/Parameters';
import { CreatePaymentRequestDto, CreatePaymentSuccessDto } from '../dtos/PaymentNewsDto';

@injectable()
export class CreatePaymentController {
  iSleep: any;

  iParameters: Parameters;

  iGetPaymentDataByIdUseCase: IUseCase<CreatePaymentRequestDto, Promise<Payment>>;

  iManagePayment: IServices<Payment, Promise<ITransaccion>>;

  iSendContingenciaUseCase: IUseCase<Retries, Promise<any>>;

  iGetRetrieRequest: IUseCase<ITransaccion, Retries>;

  tiempoMaximoPrimerConsultaPago: number;

  iGenerateLogs: IUseCase<any, void>;

  iUpdatePaymentState: IUseCase<number, Promise<void>>;

  constructor(
    @inject('GetPaymentDataByIdUseCase') private getPaymentData: IUseCase<CreatePaymentRequestDto, Promise<Payment>>,
    @inject('ManagePaymentService') private managePayment: IServices<Payment, Promise<ITransaccion>>,
    @inject('SendContingenciaUseCase') private sendContingencia: IUseCase<Retries, Promise<any>>,
    @inject('ValidateRetrieRequest') private validateRetrieRequest: IUseCase<ITransaccion, Retries>,
    @inject('Parameters') private theParameters: Parameters,
    @inject('Sleep') private sleep: any,
    @inject('GenerateLogsUseCase') private generateLogs: IUseCase<any, void>,
    @inject('UpdatePaymentStateToPending') private updatePaymentStateToPending: IUseCase<number, Promise<void>>,
  ) {
    this.iGetPaymentDataByIdUseCase = getPaymentData;
    this.iManagePayment = managePayment;
    this.iSendContingenciaUseCase = sendContingencia;
    this.iGetRetrieRequest = validateRetrieRequest;
    this.iParameters = theParameters;
    this.iSleep = sleep;
    this.tiempoMaximoPrimerConsultaPago = this.iParameters.getTiempoMaximoPrimerConsultaPago();
    this.iGenerateLogs = generateLogs;
    this.iUpdatePaymentState = updatePaymentStateToPending;
  }

  execute = async(createPaymentDto: CreatePaymentRequestDto): Promise<CreatePaymentSuccessDto | GeneralApiResponse> => {
    try {
      console.log('LLEGO AL CONTROLLER');
      const data = await this.iGetPaymentDataByIdUseCase.execute(createPaymentDto);
      const result = await this.iManagePayment.execute(data);
      console.log(result.estadoPago);
      if (result.estadoPago === 'RECHAZADO') {
        return {
          technicalCode    : 400,
          responseData     : { ...result },
          technicalMessage : 'Error pago rechazado',
          responseDate     : new Date(),
        };
      }
      if (result.estadoPago === 'PENDIENTE' && result.codigoHttp === 201) {
        await this.iUpdatePaymentState.execute(createPaymentDto.identificadorMovimiento);
        await this.iSleep.do(this.tiempoMaximoPrimerConsultaPago);
        const retrieRequest: Retries = this.iGetRetrieRequest.execute(result);
        const response = await this.iSendContingenciaUseCase.execute({ ...retrieRequest, idMovimento: createPaymentDto.identificadorMovimiento } as Retries);
        if (response.estadoPago === 'RECHAZADO') {
          return {
            technicalCode    : 400,
            responseData     : { ...response },
            technicalMessage : 'Error pago rechazado',
            responseDate     : new Date(),
          };
        }
        return {
          technicalCode    : 200,
          responseData     : { ...response },
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
      if (error instanceof PaymentDataNotFound || error instanceof ExceededPaymentRetries || error instanceof BussinessInternalError) {
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
