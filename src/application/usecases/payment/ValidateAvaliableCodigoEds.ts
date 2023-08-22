/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
import { IValidation } from '@commons/application/IValidation';
import { injectable } from 'inversify';

export type ValidateAvaliableCodigoEDSType = {
  codigoEds: string;
}

@injectable()
export class ValidateAvaliableCodigoEDS implements IValidation<ValidateAvaliableCodigoEDSType> {
  validate(params: ValidateAvaliableCodigoEDSType): boolean {
    if (params.codigoEds != null && params.codigoEds.trim() != '' && params.codigoEds.trim() != '') {
      return true;
    }
    return false;
  }
}
