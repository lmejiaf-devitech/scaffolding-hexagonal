/* eslint-disable import/extensions */
import { Pool, QueryResult } from 'pg';
// eslint-disable-next-line import/extensions
import { injectable } from 'inversify';
import CONFIG from '../../config/Config';

@injectable()
export class CoreDatabase {
  private pool: Pool;

  public constructor() {
    const poolConfig = {
      port              : CONFIG.postgres.port,
      host              : CONFIG.postgres.host,
      user              : CONFIG.postgres.username,
      password          : CONFIG.postgres.password,
      database          : CONFIG.postgres.database.core,
      max               : 2,
      idleTimeoutMillis : 30000,
    };
    this.pool = new Pool(poolConfig);

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  public async query(query: string, params: any): Promise<QueryResult> {
    try {
      const result = await this.pool.query(query, params);
      return result;
    } catch (error) {
      const errorMessage = '*****************************\n'
        + ` Error : ${error} \n`
        + '*****************************\n'
        + ` SQL : ${query} \n`
        + '*****************************\n'
        + ` Values : ${params} \n`
        + '*****************************\n';
      console.error(errorMessage);
      throw error;
    } finally {
      this.pool.end();
    }
  }
}
