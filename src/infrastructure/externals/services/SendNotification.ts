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
import UrlsConfig from '../config/Config';

@injectable()
export class SendNotification implements ISendNotification {
  clientHttp: IClientHttp;

  constructor(@inject('ClientHttpNodeFetch') iHttpClient: IClientHttp) {
    this.clientHttp = iHttpClient;
  }

  send = async (params: Payment): Promise<any> => {
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
      console.log('🚀 ~ file: SendNotification.ts:23 ~ SendNotification ~ send= ~ error', error);
    }
  };

  execute(params: any) {
    throw new Error('Method not implemented.');
  }
}
