/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
import { ValidateAvaliableFechaFinVenta } from '@application/usecases/payment/ValidateAvailableFechaFinVenta';
import { ValidateAvaliableMovimientoId } from '@application/usecases/payment/ValidateAvailableMovimientoId';
import { ValidateAvailableMonto } from '@application/usecases/payment/ValidateAvaliableMonto';
import { ValidateAvaliableSurtidor } from '@application/usecases/payment/ValidateAvaliableSurtidor';
import { IValidation } from '@commons/application/IValidation';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ValidateCreatePaymentRequestBodyMiddleware {
  private iValidateMovimiento: IValidation<ValidateAvaliableMovimientoId>;

  constructor(
    @inject('ValidateAvaliableMovimientoId') iValidateMovimiento: IValidation<ValidateAvaliableMovimientoId>,

  ) {
    this.iValidateMovimiento = iValidateMovimiento;
  }

  execute = (request: Request, response: Response, next: NextFunction) => {
    console.log('LLEGO AL MIDDLEWARE');
    const isValidMovimiento: boolean = this.iValidateMovimiento.validate(request.body);
    const observations: string[] = [];
    if (!isValidMovimiento) {
      observations.push('El movimiento no puede ser vacío o nulo');
    }
    next();
  };
}
