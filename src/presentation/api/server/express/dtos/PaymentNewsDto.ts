import { GeneralApiResponse, GeneralApiResponseError } from '@commons/presentation/GeneralApiResponse';
import { ITransaccion } from '@domain/IResponseNotification';

export type CreatePaymentRequestDto = {
  identificadorMovimiento: number;
}
export type CreatePaymentSuccessDto = GeneralApiResponse & {
    responseData: ITransaccion;
}
export type CreatePaymentFailedDto = GeneralApiResponse & GeneralApiResponseError;

export type CreatePaymentResponseDto = CreatePaymentSuccessDto | CreatePaymentFailedDto;
