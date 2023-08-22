/* eslint-disable class-methods-use-this */
import { IValidation } from '@commons/application/IValidation';
import { injectable } from 'inversify';

export type ValidateAvaliableSurtidorType = {
  surtidor: number;
}

@injectable()
export class ValidateAvaliableSurtidor implements IValidation<ValidateAvaliableSurtidorType> {
  validate(params: ValidateAvaliableSurtidorType): boolean {
    if (params.surtidor != null && params.surtidor > 0) {
      return true;
    }
    return false;
  }
}
