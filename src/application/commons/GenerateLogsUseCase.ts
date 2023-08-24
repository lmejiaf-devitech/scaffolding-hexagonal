/* eslint-disable class-methods-use-this */
import { IServices } from '@commons/application/IServices';
import { IUseCase } from '@commons/application/IUseCase';
import { injectable } from 'inversify';

@injectable()
export class GenerateLogsUseCase implements IUseCase<any, void> {
  iGenerateLogs: IServices<any, void>;

  constructor(
      iGenerateLogs: IServices<any, void>,
  ) {
    this.iGenerateLogs = iGenerateLogs;
  }

  async execute(params: any): Promise<void> {
    await this.iGenerateLogs.execute(params);
  }
}
