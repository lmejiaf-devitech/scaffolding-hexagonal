import { Container } from "inversify";
import "reflect-metadata";

import { IContainerDI } from "./commons/IContainerDI";

import log4js from 'log4js';
import { Express, Router } from "express"

import { ILogger } from "@infrastructure/logger/commons/ILogger";
import { LoggerLog4JS } from "@infrastructure/logger/LoggerLog4JS";

import { IServerSecurityConfigurer } from "@commons/presentation/IServerSecurityConfigurer";
import { IMapper } from "@commons/IMapper";
import { IServerApi } from "@commons/presentation/IServerApi";

import { ExpressSecurityConfigured } from "@presentation/api/server/express/ExpressSecurityConfigured";
import { ExpressApi } from "@presentation/api/server/express/ExpressApi";
import { CreateNewsDto } from "@presentation/api/server/express/dtos/CreateNewsDto";
import { MapCreateNewsDtoToNewsDomain } from "@presentation/api/server/express/mappers/MapCreateNewsDtoToNewsDomain";

import { News } from "@domain/entities/News";

export class ContainerDI implements IContainerDI {

    private iContainer: Container;

    constructor() {
        this.iContainer = new Container();
    }

    registerDependencies(): void {
        // bindear propiedades

        //Infraestructura
        //logger
        this.iContainer.bind<ILogger<log4js.Logger>>("LoggerLog4JS").to(LoggerLog4JS).inSingletonScope();
        //server
        this.iContainer.bind<IServerSecurityConfigurer<Express>>("ExpressSecurityConfigured").to(ExpressSecurityConfigured).inSingletonScope();
        this.iContainer.bind<IServerApi<Array<Router>>>("ExpressApi").to(ExpressApi).inSingletonScope();



        //Application
        //uses cases

        //services

        //Presentation
        //mappers
        this.iContainer.bind<IMapper<CreateNewsDto, News>>("MapCreateNewsDtoToNewsDomain").to(MapCreateNewsDtoToNewsDomain).inTransientScope();

        //controllers
        //this.iContainer.bind<>


    }

    getContainerDI(): Container {
        return this.iContainer;
    }
}