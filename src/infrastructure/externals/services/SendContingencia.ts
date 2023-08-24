/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import { IClientHttp } from '@commons/infrastructure/IClientHttp';
import { inject, injectable } from 'inversify';
import { Parameters } from '@domain/entities/Parameters';
import { Sleep } from '@application/commons/Sleep';
import { ExceededPaymentRetries } from '@domain/domain-exceptions/ExceededPaymentRetries';
import { IUseCase } from '@commons/application/IUseCase';
import {
  ESTADOS_PAGO, ESTATUS_PAGO, TIPO_ENVIO, TIPO_RESPUESTA,
} from '@domain/constants';
import { Retries } from '@domain/entities/Retries';
import UrlsConfig from '../config/Config';

@injectable()
export class SendContingencia {
  clientHttp: IClientHttp;

  maximoNumeroReenvios: number;

  maximoTiempoReenvio: number;

  iGenerateLogs: IUseCase<any, void>;

  constructor(
    @inject('ClientHttpNodeFetch') iHttpClient: IClientHttp,
    @inject('Parameters') private theParameters: Parameters,

    @inject('Sleep') private sleep: Sleep,
    @inject('GenerateLogsUseCase') private generateLogs: IUseCase<any, void>,
  ) {
    this.clientHttp = iHttpClient;
    this.maximoNumeroReenvios = this.theParameters.getMaximoNumeroReenvios();
    this.maximoTiempoReenvio = this.theParameters.getMaximoTiempoReenvio();
    this.iGenerateLogs = generateLogs;
  }

  send = async (params: Retries, intentos = 0): Promise<any> => {
    const url = UrlsConfig.urls.contingencia;
    const request = {
      idSeguimiento  : params.idSeguimiento,
      idReintento    : params.idReintento,
      fechaReintento : params.fechaReintento,
    };
    await this.iGenerateLogs.execute({
      objeto            : request,
      idTipoRespuesta   : TIPO_RESPUESTA.REQUEST,
      idEstado          : ESTADOS_PAGO.PENDIENTE,
      idStatus          : ESTATUS_PAGO.PENDIENTE,
      idTipoEnvio       : TIPO_ENVIO.REINTENTO,
      codigoSeguimiento : params.idSeguimiento,
      idMovimento       : params.idMovimento,
    });
    try {
      const response = await this.clientHttp.post(url, request);
      console.log('🚀 ~ file: SendNotification.ts:21 ~ SendNotification ~ send= ~ response:', response);
      return response;
    } catch (error: Error | any) {
      if (intentos >= this.maximoNumeroReenvios) {
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
