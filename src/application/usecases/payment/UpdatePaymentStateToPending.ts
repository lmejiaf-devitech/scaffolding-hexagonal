/* eslint-disable class-methods-use-this */
import { IUseCase } from '@commons/application/IUseCase';
import { inject, injectable } from 'inversify';
import { ESTADOS_PAGO } from '@domain/constants';
import { IUpdatePaymentState } from '@domain/UpdatePaymentState';

@injectable()
export class UpdatePaymentStateToPending implements IUseCase<number, Promise<void>> {
  private iUpdatePaymentState: IUseCase<IUpdatePaymentState, void>;

  constructor(
    @inject('UpdatePaymentState') private updatePaymentState: IUseCase<IUpdatePaymentState, void>,
  ) {
    this.iUpdatePaymentState = updatePaymentState;
  }

  execute = async (identificadorMovimiento:number): Promise<void> => {
    try {
      await this.iUpdatePaymentState.execute({
        identificadorMovimiento,
        estadoPago: ESTADOS_PAGO.PENDIENTE,
      });
    } catch (error) {
      console.log('Error al actualizar el estado del pago a pendiente');
      console.log(error);
    }
  };
}
