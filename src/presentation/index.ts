import { ContainerDI } from "@infrastructure/container/ContainerDI";
import { IServerApi } from "@commons/presentation/IServerApi";
import { Router } from "express";

import { newsRouterV1 } from "./api/server/express/routers/NewsRouter";



// definiendo container de dependencias
const containerDI = new ContainerDI();
containerDI.registerDependencies();


// definiendo punto de entrada
const expressApi = containerDI.getContainerDI().get<IServerApi<(Array<Router>)>>("ExpressApi");

expressApi.loadRouters("/v1", [newsRouterV1]);
//expressApi.loadRouters("/v2", [newsRouterV2]);
//expressApi.loadRouters("/v3", [newsRouterV3]);
//expressApi.loadRouters("/vN", [newsRouterVN]);

expressApi.run();