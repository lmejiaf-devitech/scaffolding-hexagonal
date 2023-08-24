import { Container } from 'inversify';
import 'reflect-metadata';

import { IContainerDI } from '@commons/container/IContainerDI';

import log4js from 'log4js';
import { Express, Router } from 'express';

import { LoggerLog4JS } from '@infrastructure/logger/LoggerLog4JS';

import { ILogger } from '@commons/infrastructure/ILogger';
import { IServerSecurityConfigurer } from '@commons/presentation/IServerSecurityConfigurer';
import { IServerApi } from '@commons/presentation/IServerApi';

import { ExpressSecurityConfigured } from '@presentation/api/server/express/ExpressSecurityConfigured';
import { ExpressApi } from '@presentation/api/server/express/ExpressApi';
import { IValidation } from '@commons/application/IValidation';
import { ValidateDescriptionOfNewsNotEmpty, ValidateDescriptionOfNewsNotEmptyType } from '@application/usecases/ValidateDescriptionOfNewsNotEmpty';
import { ValidateTitleOfNewsNotEmpty, ValidateTitleOfNewsNotEmptyType } from '@application/usecases/ValidateTitleOfNewsNotEmpty';
import { ValidateCreateNewsRequestBodyMiddleware } from '@presentation/api/server/express/middlewares/ValidateCreateNewsRequestBodyMiddleware';
import { ValidateAvaliableMovimientoId, ValidateAvaliableMovimientoIdType } from '@application/usecases/payment/ValidateAvailableMovimientoId';
import { IClientHttp } from '@commons/infrastructure/IClientHttp';
import { ValidateCreatePaymentRequestBodyMiddleware } from '@presentation/api/server/express/middlewares/ValidatePaymentRequestBodyMiddleware';
import { CreatePaymentController } from '@presentation/api/server/express/controllers/CreatePaymentController';
import { CoreDatabase } from '@infrastructure/persistence/Database/CoreDatabase';
import { GetPaymentData } from '@infrastructure/persistence/services/GetPaymentData';
import { InsertPayment } from '@infrastructure/persistence/services/InsertPayment';
import { GetPaymentDataByIdUseCase } from '@application/usecases/payment/GetPaymentDataByIdUseCase';
import { ClientHttpNodeFetch } from '@infrastructure/externals/nodefetch/ClientHttpNodeFetch';
import { IGetPaymentData } from '@domain/repositories/IGetPaymentData';
import { IServices } from '@commons/application/IServices';
import { ManagePaymentService } from '@application/services/ManagePayment';
import { Payment } from '@domain/entities/Payment';
import { ITransaccion } from '@domain/IResponseNotification';
import { SendNotification } from '@infrastructure/externals/services/SendNotification';
import { ISendNotification } from '@domain/ISendNotification';
import { SendContingencia } from '@infrastructure/externals/services/SendContingencia';
import { IUseCase } from '@commons/application/IUseCase';
import { SendContingenciaUseCase } from '@application/usecases/SendContingenciaUseCase';
import { Retries } from '@domain/entities/Retries';
import { ValidateRetrieRequest } from '@application/usecases/payment/ValidateRetrieRequest';
import { GetParameters } from '@infrastructure/persistence/services/GetParameters';
import { SetGlobalParameters } from '@application/usecases/SetGlobalParameters';
import { Parameters } from '@domain/entities/Parameters';
import { Sleep } from '@application/commons/Sleep';
import { GenerateLogs } from '@infrastructure/persistence/services/GenerateLogs';
import { GenerateLogsUseCase } from '@application/commons/GenerateLogsUseCase';

export class ContainerDI implements IContainerDI<Container> {
  private iContainer: Container;

  constructor() {
    this.iContainer = new Container();
  }

  getContainer(): Container {
    return this.iContainer;
  }

  registerDependencies(): void {
    // transcient ->> hace un new cada vez que se obtiene o inyecta
    // singleton -> una instancia compartida para todos
    // logger
    this.iContainer.bind<ILogger<log4js.Logger>>('LoggerLog4JS').to(LoggerLog4JS).inSingletonScope();

    this.iContainer.bind<IValidation<ValidateDescriptionOfNewsNotEmptyType>>('ValidateDescriptionOfNewsNotEmpty').to(ValidateDescriptionOfNewsNotEmpty).inTransientScope();
    this.iContainer.bind<IValidation<ValidateTitleOfNewsNotEmptyType>>('ValidateTitleOfNewsNotEmpty').to(ValidateTitleOfNewsNotEmpty).inTransientScope();
    this.iContainer.bind<ValidateCreateNewsRequestBodyMiddleware>('ValidateCreateNewsRequestBodyMiddleware').to(ValidateCreateNewsRequestBodyMiddleware).inTransientScope();

    this.iContainer.bind<IClientHttp>('ClientHttpNodeFetch').to(ClientHttpNodeFetch).inTransientScope();

    // server
    this.iContainer.bind<IServerSecurityConfigurer<Express>>('ExpressSecurityConfigured').to(ExpressSecurityConfigured).inSingletonScope();
    this.iContainer.bind<IServerApi<Array<Router>>>('ExpressApi').to(ExpressApi).inSingletonScope();

    // ---------------------------------->
    // -> poner las interfaces, no la implementaciòn especìfica a menos que sea necesario como por ejemplo en el caso de los middlewares
    // El dao dao

    this.iContainer.bind<Parameters>('Parameters').to(Parameters).inSingletonScope();
    // Middlewares
    this.iContainer.bind<ValidateCreatePaymentRequestBodyMiddleware>('ValidateCreatePaymentRequestBodyMiddleware').to(ValidateCreatePaymentRequestBodyMiddleware).inTransientScope();
    this.iContainer.bind<IValidation<ValidateAvaliableMovimientoIdType>>('ValidateAvaliableMovimientoId').to(ValidateAvaliableMovimientoId).inTransientScope();

    // Controllers
    this.iContainer.bind<CreatePaymentController>('CreatePaymentController').to(CreatePaymentController).inTransientScope();

    // Database
    this.iContainer.bind<CoreDatabase>('CoreDatabase').to(CoreDatabase).inTransientScope();

    // Database Services
    this.iContainer.bind<IGetPaymentData>('GetPaymentData').to(GetPaymentData).inTransientScope();
    this.iContainer.bind<InsertPayment>('InsertPayment').to(InsertPayment).inTransientScope();
    this.iContainer.bind<GetParameters>('GetParameters').to(GetParameters).inTransientScope();
    this.iContainer.bind<IServices<any, void>>('GenerateLogs').to(GenerateLogs).inTransientScope();

    // Services (usecases)
    this.iContainer.bind<GetPaymentDataByIdUseCase>('GetPaymentDataByIdUseCase').to(GetPaymentDataByIdUseCase).inTransientScope();
    this.iContainer.bind<IServices<Payment, Promise<ITransaccion>>>('ManagePaymentService').to(ManagePaymentService).inTransientScope();
    this.iContainer.bind<IServices<any, void>>('GenerateLogsUseCase').to(GenerateLogsUseCase).inTransientScope();
    // Commons use cases
    this.iContainer.bind<Sleep>('Sleep').to(Sleep).inTransientScope();
    // ---------------------------------->
    // External Services

    this.iContainer.bind<ISendNotification>('SendNotification').to(SendNotification).inRequestScope();
    this.iContainer.bind<ISendNotification>('SendContingencia').to(SendContingencia).inRequestScope();
    // UseCases
    this.iContainer.bind<IUseCase<Retries, Promise<any>>>('SendContingenciaUseCase').to(SendContingenciaUseCase).inTransientScope();
    this.iContainer.bind<IUseCase<ITransaccion, Retries>>('ValidateRetrieRequest').to(ValidateRetrieRequest).inTransientScope();

    // Golbal configurations for the application

    this.iContainer.bind<IUseCase<void, void>>('SetGlobalParameters').to(SetGlobalParameters).inSingletonScope();
  }
}
