import { Container } from "inversify";
import "reflect-metadata";

import { IContainerDI } from "@commons/container/IContainerDI";

import log4js from 'log4js';
import { Express, Router } from "express"

import { LoggerLog4JS } from "@infrastructure/logger/LoggerLog4JS";

import { ILogger } from "@commons/infrastructure/ILogger";
import { IServerSecurityConfigurer } from "@commons/presentation/IServerSecurityConfigurer";
import { IServerApi } from "@commons/presentation/IServerApi";

import { ExpressSecurityConfigured } from "@presentation/api/server/express/ExpressSecurityConfigured";
import { ExpressApi } from "@presentation/api/server/express/ExpressApi";
import { IValidation } from "@commons/application/IValidation";
import { ValidateDescriptionOfNewsNotEmpty, ValidateDescriptionOfNewsNotEmptyType } from "@application/usecases/ValidateDescriptionOfNewsNotEmpty";
import { ValidateTitleOfNewsNotEmpty, ValidateTitleOfNewsNotEmptyType } from "@application/usecases/ValidateTitleOfNewsNotEmpty";
import { ValidateCreateNewsRequestBodyMiddleware } from "@presentation/api/server/express/middlewares/ValidateCreateNewsRequestBodyMiddleware";
import { IClientHttp } from "@commons/infrastructure/IClientHttp";
import { ClientHttpNodeFetch } from "@infrastructure/externals/nodefetch/ClientHttpNodeFetch";

export class ContainerDI implements IContainerDI<Container> {

    private iContainer: Container;

    constructor() {
        this.iContainer = new Container();
    }
    getContainer(): Container {
        return this.iContainer;
    }

    registerDependencies(): void {

        //transcient ->> hace un new cada vez que se obtiene o inyecta
        //singleton -> una instancia compartida para todos

        //logger
        this.iContainer.bind<ILogger<log4js.Logger>>("LoggerLog4JS").to(LoggerLog4JS).inSingletonScope();

        this.iContainer.bind<IClientHttp>("ClientHttpNodeFetch").to(ClientHttpNodeFetch).inTransientScope();

        this.iContainer.bind<IValidation<ValidateDescriptionOfNewsNotEmptyType>>("ValidateDescriptionOfNewsNotEmpty").to(ValidateDescriptionOfNewsNotEmpty).inTransientScope();
        this.iContainer.bind<IValidation<ValidateTitleOfNewsNotEmptyType>>("ValidateTitleOfNewsNotEmpty").to(ValidateTitleOfNewsNotEmpty).inTransientScope();
        this.iContainer.bind<ValidateCreateNewsRequestBodyMiddleware>("ValidateCreateNewsRequestBodyMiddleware").to(ValidateCreateNewsRequestBodyMiddleware).inTransientScope();


        //server
        this.iContainer.bind<IServerSecurityConfigurer<Express>>("ExpressSecurityConfigured").to(ExpressSecurityConfigured).inSingletonScope();
        this.iContainer.bind<IServerApi<Array<Router>>>("ExpressApi").to(ExpressApi).inSingletonScope();

    }
}