/* eslint-disable class-methods-use-this */
import { IValidation } from '@commons/application/IValidation';
import { injectable } from 'inversify';

export type ValidateAvaliableMovimientoIdType = {
  identificadorMovimiento: number;
}

@injectable()
export class ValidateAvaliableMovimientoId implements IValidation<ValidateAvaliableMovimientoIdType> {
  validate(params: ValidateAvaliableMovimientoIdType): boolean {
    if (params.identificadorMovimiento != null && params.identificadorMovimiento > 0) {
      return true;
    }
    return false;
  }
}
