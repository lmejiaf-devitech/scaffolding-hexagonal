/* eslint-disable class-methods-use-this */
import { IValidation } from '@commons/application/IValidation';
import { injectable } from 'inversify';

export type ValidateMontoMontoType = {
  monto: number;
}

@injectable()
export class ValidateAvailableMonto implements IValidation<ValidateMontoMontoType> {
  validate(params: ValidateMontoMontoType): boolean {
    if (params.monto != null && params.monto > 0) {
      return true;
    }
    return false;
  }
}
