/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IClientHttp } from '@commons/infrastructure/IClientHttp';
// import { ITransaccion } from '@domain/IResponseNotification';
import { inject, injectable } from 'inversify';
import { Payment } from '@domain/entities/Payment';
import { ISendNotification } from '@domain/ISendNotification';
import { Sleep } from '@application/commons/Sleep';
import { Parameters } from '@domain/entities/Parameters';
import { ExceededPaymentRetries } from '@domain/domain-exceptions/ExceededPaymentRetries';
import UrlsConfig from '../config/Config';

@injectable()
export class SendNotification implements ISendNotification {
  clientHttp: IClientHttp;

  maximoNumeroReenvios: number;

  maximoTiempoReenvio: number;

  constructor(
    @inject('ClientHttpNodeFetch') iHttpClient: IClientHttp,
    @inject('Parameters') private theParameters: Parameters,

    @inject('Sleep') private sleep: Sleep,
  ) {
    this.clientHttp = iHttpClient;
    this.maximoNumeroReenvios = this.theParameters.getMaximoNumeroReenvios();
    this.maximoTiempoReenvio = this.theParameters.getMaximoTiempoReenvio();
  }

  send = async (params: Payment, intentos = 0): Promise<any> => {
    const url = UrlsConfig.urls.notificacion;
    try {
      const response = await this.clientHttp.post(url, {
        manguera      : params.manguera,
        surtidor      : params.surtidor,
        monto         : params.monto,
        codigoEDS     : params.codigoEDS,
        fechaFinVenta : params.fechaFinVenta,
      });
      return response;
    } catch (error) {
      console.log('🚀 ~ file: SendNotification.ts:48 ~ SendNotification ~ send= ~ this.maximoNumeroReenvios:', this.maximoNumeroReenvios);
      if (intentos >= Number(this.maximoNumeroReenvios)) {
        throw new ExceededPaymentRetries();
      }
      await this.sleep.do(this.maximoTiempoReenvio);
      console.log('El intento es', intentos);
      await this.send(params, intentos + 1);
    }
  };

  execute(params: any) {
    throw new Error('Method not implemented.');
  }
}
