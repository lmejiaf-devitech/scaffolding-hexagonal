/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import { inject, injectable } from 'inversify';
import { QueryErorr } from '@domain/domain-exceptions/QueryError';
import { IGetPaymentData } from '@domain/repositories/IGetPaymentData';
import { Payment } from '@domain/entities/Payment';
import { CoreDatabase } from '../Database/CoreDatabase';

@injectable()
export class GetPaymentData implements IGetPaymentData {
  private iCoreDatabase: CoreDatabase;

  constructor(@inject('CoreDatabase') private coreDatabase: CoreDatabase) {
    this.iCoreDatabase = coreDatabase;
  }

  searchPaymentData = async (params: number): Promise<Payment> => {
    try {
      const movimientoId = params;

      const result = (
        await this.iCoreDatabase.query(
          `select
            cm.venta_total as monto,
            cm.fecha as "fechaFinVenta",
            cm.atributos -> 'manguera' manguera,
            e.codigo_empresa as "codigoEds",
            cm.atributos -> 'cara' cara,
            cm.atributos -> 'surtidor' surtidor
            from ct_movimientos cm 
            inner join empresas e on e.id = cm.empresas_id
            where cm.id = $1`,
          [ movimientoId ],
        )
      ).rows[0];
      console.log('🚀 ~ file: GetPaymentData.ts:36 ~ GetPaymentData ~ searchPaymentData= ~ result:', result);
      // parsear rows[0] a un objeto payment [TO DO] CON UN MAPPER

      const payment = new Payment();
      payment.setFechaFinVenta(result.fechaFinVenta);
      payment.setManguera(result.manguera);
      payment.setMonto(result.monto);
      payment.setcodigoEDS(result.codigoEds);
      payment.setSurtidor(result.surtidor);

      return payment;
    } catch (error) {
      console.error(error);
      throw new QueryErorr('Error al obtener datos de el pago');
    }
  };
}
