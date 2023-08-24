import { IServices } from '@commons/application/IServices';
import { IUseCase } from '@commons/application/IUseCase';
import { Parameters } from '@domain/entities/Parameters';
import { inject, injectable } from 'inversify';

@injectable()
export class SetGlobalParameters implements IUseCase<void, void> {
  iGetParameters: IUseCase<void, any>;

  iParameters: any;

  constructor (
    @inject('GetParameters') private getParameters: IServices<void, any>,
    @inject('Parameters') private theParameters: Parameters,
  ) {
    this.iGetParameters = getParameters;
    this.iParameters = theParameters;
  }

  execute = async (): Promise<void> => {
    const results = await this.iGetParameters.execute();

    const maximoNumeroReenvios = results.find((result: any) => result.descripcion === 'APPTERPEL_INTEGRATION_SERVICE_MAX_NUMERO_REENVIO');

    const maximoTiempoReenvio = results.find((result: any) => result.descripcion === 'APPTERPEL_INTEGRATION_SERVICE_MAX_TIEMPO_REENVIO');

    const tiempoMaximoPrimerConsultaPago = results.find((result: any) => result.descripcion === 'APPTERPEL_INTEGRATION_SERVICE_TIEMPO_MAX_PRIMER_CONSULTA_PAGO');

    const tiempoMaximoPrimerReenvio = results.find((result: any) => result.descripcion === 'APPTERPEL_INTEGRATION_SERVICE_TIEMPO_MAX_PRIMER_REENVIO');

    const maximoNumeroConsultaPago = results.find((result: any) => result.descripcion === 'APPTERPEL_INTEGRATION_SERVICE_MAX_NUMERO_CONSULTA_PAGO');

    const maximoTiempoConsultaPago = results.find((result: any) => result.descripcion === 'APPTERPEL_INTEGRATION_SERVICE_MAX_TIEMPO_CONSULTA_PAGO');

    const parameters = this.iParameters;
    parameters.setMaximoNumeroReenvios(maximoNumeroReenvios.valor);
    parameters.setMaximoTiempoReenvio(maximoTiempoReenvio.valor);
    parameters.setTiempoMaximoPrimerConsultaPago(tiempoMaximoPrimerConsultaPago.valor);
    parameters.setTiempoMaximoPrimerReenvio(tiempoMaximoPrimerReenvio.valor);
    parameters.setMaximoNumeroConsultaPago(maximoNumeroConsultaPago.valor);
    parameters.setMaximoTiempoConsultaPago(maximoTiempoConsultaPago.valor);
    console.log('🚀 ~ file: SetGlobalParameters.ts:32 ~ SetGlobalParameters ~ execute= ~ parameters:', parameters);
  };
}
