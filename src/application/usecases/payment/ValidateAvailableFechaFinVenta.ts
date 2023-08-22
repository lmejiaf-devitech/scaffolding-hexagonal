/* eslint-disable class-methods-use-this */
import { IValidation } from '@commons/application/IValidation';
import { injectable } from 'inversify';

export type ValidateAvaliableFechaFinVentaType = {
  fechaFinVenta: number;
}

@injectable()
export class ValidateAvaliableFechaFinVenta implements IValidation<ValidateAvaliableFechaFinVentaType> {
  validate(params: ValidateAvaliableFechaFinVentaType): boolean {
    if (params.fechaFinVenta != null && params.fechaFinVenta > 0) {
      return true;
    }
    return false;
  }
}
