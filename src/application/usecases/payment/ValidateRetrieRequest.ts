/* eslint-disable class-methods-use-this */
import { IUseCase } from '@commons/application/IUseCase';
import { ITransaccion } from '@domain/IResponseNotification';
import { Retries } from '@domain/entities/Retries';
import { injectable } from 'inversify';

@injectable()
export class ValidateRetrieRequest implements IUseCase<ITransaccion, Retries> {
  execute = (request: ITransaccion): Retries => {
    const retries = new Retries();
    retries.setidSeguimiento(request.idSeguimiento);
    retries.setidReintento(1);
    retries.setfechaReintento(new Date());
    return retries;
  };
}
