/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import { IClientHttp } from '@commons/infrastructure/IClientHttp';
import { Payment } from '@domain/entities/Payment';
import { inject, injectable } from 'inversify';
import UrlsConfig from '../config/Config';

@injectable()
export class SendContingencia {
  clientHttp: IClientHttp;

  constructor(@inject('ClientHttpNodeFetch') iHttpClient: IClientHttp) {
    this.clientHttp = iHttpClient;
  }

  send = async (params: Payment): Promise<any> => {
    const url = UrlsConfig.urls.contingencia;
    try {
      const response = await this.clientHttp.post(url, {
        manguera      : params.manguera,
        surtidor      : params.surtidor,
        monto         : params.monto,
        codigoEDS     : params.codigoEDS,
        fechaFinVenta : params.fechaFinVenta,
      });
      console.log('🚀 ~ file: SendNotification.ts:21 ~ SendNotification ~ send= ~ response:', response);
      return response;
    } catch (error) {
      console.log('🚀 ~ file: SendNotification.ts:23 ~ SendNotification ~ send= ~ error', error);
    }
  };

  execute(params: any) {
    throw new Error('Method not implemented.');
  }
}
