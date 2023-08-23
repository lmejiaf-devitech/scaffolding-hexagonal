/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { inject, injectable } from 'inversify';
import { CoreDatabase } from '../Database/CoreDatabase';

@injectable()
export class GetParameters {
  iCoreDatabase: CoreDatabase;

  constructor(@inject('CoreDatabase') private coreDatabase: CoreDatabase) {
    this.iCoreDatabase = coreDatabase;
  }

  execute = async (): Promise<any> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const results = await this.iCoreDatabase.query(
        `
        select p.descripcion ,tvp.valor 
          from parametrizacion.parametros p 
          inner join parametrizacion.tbl_valor_parametros tvp on tvp.id_parametro = p.id_parametro
        where p.descripcion ilike '%APPTERPEL_INTEGRATION_SERVICE%' ;`,
      );
      return results.rows;
    } catch (error) {
      console.log('Error');
    }
  };
}
