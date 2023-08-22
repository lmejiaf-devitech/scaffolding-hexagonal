/* eslint-disable class-methods-use-this */
import { IValidation } from '@commons/application/IValidation';
import { injectable } from 'inversify';

export type ValidateAvaliableMangueraType = {
  manguera: number;
}

@injectable()
export class ValidateAvaliableManguera implements IValidation<ValidateAvaliableMangueraType> {
  validate(params: ValidateAvaliableMangueraType): boolean {
    if (params.manguera != null && params.manguera > 0) {
      return true;
    }
    return false;
  }
}
