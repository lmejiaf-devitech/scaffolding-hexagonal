import { IUseCase } from '@commons/application/IUseCase';

export interface ISendNotification extends IUseCase<any, any> {
  send(params: any): Promise<any>;
}
