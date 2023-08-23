/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable class-methods-use-this */
import { IUseCase } from '@commons/application/IUseCase';
import { ISendNotification } from '@domain/ISendNotification';
import { BussinessInternalError } from '@domain/domain-exceptions/BussinessInternalError';
import { ExceededPaymentRetries } from '@domain/domain-exceptions/ExceededPaymentRetries';
import { Retries } from '@domain/entities/Retries';
import { inject, injectable } from 'inversify';

@injectable()
export class SendContingenciaUseCase implements IUseCase<Retries, Promise<any>> {
  private readonly iSendNotification: ISendNotification;

  constructor(
    @inject('SendContingencia') private sendContingencia: ISendNotification,
  ) {
    this.iSendNotification = sendContingencia;
  }

  execute = async (params: Retries) => {
    const result = await this.send(params);
    return result;
  };

  async send(params: Retries, intentos = 0): Promise<any> {
    console.log('Los reintentos');
    const result = await this.iSendNotification.send(params);
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
    if (intentos >= 3) {
      throw new ExceededPaymentRetries();
    }
    await this.sleep(5000);
    await this.send(params, intentos + 1);
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
