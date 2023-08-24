/* eslint-disable class-methods-use-this */
import { IServices } from '@commons/application/IServices';
import { IUseCase } from '@commons/application/IUseCase';
import { inject, injectable } from 'inversify';

@injectable()
export class GenerateLogsUseCase implements IUseCase<any, void> {
  iGenerateLogs: IServices<any, void>;

  constructor(
      @inject('GenerateLogs') generateLogs: IServices<any, void>,
  ) {
    this.iGenerateLogs = generateLogs;
  }

  async execute(params: any): Promise<void> {
    await this.iGenerateLogs.execute(params);
  }
}
