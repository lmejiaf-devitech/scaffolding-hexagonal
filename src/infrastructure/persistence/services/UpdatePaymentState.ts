import { inject, injectable } from 'inversify';
import { IServices } from '@commons/application/IServices';
import { CoreDatabase } from '@infrastructure/persistence/Database/CoreDatabase';
import { IUpdatePaymentState } from '@domain/UpdatePaymentState';

@injectable()
export class UpdatePaymentState implements IServices<IUpdatePaymentState, void> {
  private iCoreDatabase: CoreDatabase;

  constructor(
    @inject('CoreDatabase') iCoreDatabase: CoreDatabase,
  ) {
    this.iCoreDatabase = iCoreDatabase;
  }

  public async execute(stateToUpdate: IUpdatePaymentState): Promise<void> {
    const { identificadorMovimiento, estadoPago } = stateToUpdate;
    const query = 'update pagos.tbl_pagos set id_estado = $1 where id_movimiento = $2';
    const params = [ estadoPago, identificadorMovimiento ];
    await this.iCoreDatabase.query(query, params);
  }
}
