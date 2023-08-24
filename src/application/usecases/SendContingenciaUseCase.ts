/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable class-methods-use-this */
import { IUseCase } from '@commons/application/IUseCase';
import { ISendNotification } from '@domain/ISendNotification';
import {
  ESTADOS_PAGO, ESTATUS_PAGO, TIPO_ENVIO, TIPO_RESPUESTA,
} from '@domain/constants';
import { BussinessInternalError } from '@domain/domain-exceptions/BussinessInternalError';
import { ExceededPaymentRetries } from '@domain/domain-exceptions/ExceededPaymentRetries';
import { Parameters } from '@domain/entities/Parameters';
import { Retries } from '@domain/entities/Retries';
import { inject, injectable } from 'inversify';

@injectable()
export class SendContingenciaUseCase implements IUseCase<Retries, Promise<any>> {
  private readonly iSendNotification: ISendNotification;

  private readonly iParameters: Parameters;

  private readonly maximoNumeroConsultaPago: number;

  private readonly tiempoMaximoPrimerConsultaPago: number;

  private readonly iGenerateLogs: IUseCase<any, void>;

  constructor(
    @inject('SendContingencia') private sendContingencia: ISendNotification,
    @inject('Parameters') private theParameters: Parameters,
    @inject('GenerateLogsUseCase') private generateLogs: IUseCase<any, void>,

  ) {
    this.iSendNotification = sendContingencia;
    this.iParameters = theParameters;
    this.maximoNumeroConsultaPago = this.iParameters.getMaximoNumeroConsultaPago();
    this.tiempoMaximoPrimerConsultaPago = this.iParameters.getTiempoMaximoPrimerConsultaPago();
    this.iGenerateLogs = generateLogs;
  }

  execute = async (params: Retries) => {
    const result = await this.send(params);
    return result;
  };

  async send(params: Retries, intentos = 0): Promise<any> {
    console.log('Los reintentos');
    const result = await this.iSendNotification.send(params);
    // await this.iGenerateLogs.execute({
    //   objeto            : result,
    //   idTipoRespuesta   : TIPO_RESPUESTA.RESPONSE,
    //   idEstado          : ESTADOS_PAGO[result.estadoPago],
    //   idStatus          : ESTATUS_PAGO[result.estadoPago],
    //   idTipoEnvio       : TIPO_ENVIO.REINTENTO,
    //   codigoSeguimiento : params.idSeguimiento,
    //   idMovimento       : params.idMovimento,
    // });
    if (result.estadoPago === 'APROBADO' || result.estadoPago === 'RECHAZADO') {
      return result;
    }
    console.log(result.codigoHttp);
    if (result.codigoHttp === 422) {
      console.log('Entro aqui');
      throw new BussinessInternalError();
    }
    console.log('Los reintentos', intentos);
    console.log('Los reintentos', intentos >= 3);
    if (intentos >= this.maximoNumeroConsultaPago) {
      throw new ExceededPaymentRetries();
    }
    await this.sleep(this.tiempoMaximoPrimerConsultaPago);
    await this.send(params, intentos + 1);
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, Number(ms) * 1000));
  }
}
