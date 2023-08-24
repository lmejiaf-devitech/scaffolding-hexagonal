/* eslint-disable import/extensions */
import { inject, injectable } from 'inversify';
import { IServices } from '@commons/application/IServices';
import { CoreDatabase } from '../Database/CoreDatabase';

@injectable()
export class GenerateLogs implements IServices<any, void> {
  private dbCore: CoreDatabase;

  constructor(
    @inject('CoreDatabase') private coreDatabase: CoreDatabase,
  ) {
    this.dbCore = coreDatabase;
  }

  execute = async (params: any): Promise<void> => {
    try {
      const {
        objeto, idTipoRespuesta, idEstado, idStatus, idTipoEnvio, codigoSeguimiento, idMovimento,
      } = params;
      const movimiento = await this.dbCore.query(`
        select pg.id_pago
        from pagos.tbl_pagos pg
        inner join public.ct_movimientos cm on cm.id = pg.id_movimiento 
        where cm.id = $1
        ;
      `, [ idMovimento ]);
      const id = movimiento.rows[0].id_pago;
      await this.dbCore.query(`
        call pagos.prc_generar_logs_pagos($1, $2, $3, $4, $5, $6, $7);
        `, [ objeto, idTipoRespuesta, idEstado, idStatus, id, idTipoEnvio, codigoSeguimiento ]);
    } catch (error) {
      console.log(error);
      throw new Error('Error al generar logs');
    }
  };
}
