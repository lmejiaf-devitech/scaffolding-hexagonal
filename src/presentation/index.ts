import { newsRouterV1 } from "./api/server/express/routers/NewsRouter";
import { containerDI } from "@commons/container";
import { ExpressApi } from "./api/server/express/ExpressApi";


// definiendo punto de entrada
const expressApi = containerDI.getContainer().resolve(ExpressApi);

expressApi.loadRouters("/v1", [newsRouterV1]);
//expressApi.loadRouters("/v2", [newsRouterV2]);
//expressApi.loadRouters("/v3", [newsRouterV3]);
//expressApi.loadRouters("/vN", [newsRouterVN]);

expressApi.run();