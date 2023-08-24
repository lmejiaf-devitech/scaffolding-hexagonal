/* eslint-disable class-methods-use-this */

import { injectable } from 'inversify';

/* eslint-disable no-promise-executor-return */
@injectable()
export class Sleep {
  do = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, Number(ms || 5) * 1000));
  };
}
