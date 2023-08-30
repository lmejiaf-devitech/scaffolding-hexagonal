/* eslint-disable no-useless-constructor */
import { IUseCase } from '@commons/application/IUseCase';
import { ISendNotification } from '@domain/ISendNotification';
import {
  ESTADOS_PAGO, ESTATUS_PAGO, TIPO_ENVIO, TIPO_RESPUESTA,
} from '@domain/constants';
import { Payment } from '@domain/entities/Payment';
import { inject, injectable } from 'inversify';

@injectable()
export class SendPaymentTo {
  private readonly iSendNotification: ISendNotification;

  private readonly iGenerateLogs: IUseCase<any, void>;

  constructor(
    @inject('SendNotification') private sendNotification: ISendNotification,
    @inject('GenerateLogsUseCase') private generateLogs: IUseCase<any, void>,
  ) {
    this.iSendNotification = sendNotification;
    this.iGenerateLogs = generateLogs;
  }

  async send(params: Payment): Promise<any> {
    const { identificadorMovimiento, ...paramsToSend } = params;
    const response = await this.iSendNotification.send(paramsToSend);
    await this.iGenerateLogs.execute({
      objeto            : params,
      idTipoRespuesta   : TIPO_RESPUESTA.REQUEST,
      idEstado          : ESTADOS_PAGO.PROCESADO,
      idStatus          : ESTATUS_PAGO.PENDIENTE,
      idTipoEnvio       : TIPO_ENVIO.REENVIO,
      codigoSeguimiento : response.codigoSeguimiento,
      idMovimento       : identificadorMovimiento,
    });
    return response;
  }
}
