/* eslint-disable import/extensions */
import { containerDI } from '@commons/container';
import { SetGlobalParameters } from '@application/usecases/SetGlobalParameters';
import { newsRouterV1 } from './api/server/express/routers/NewsRouter';
import { ExpressApi } from './api/server/express/ExpressApi';
import { paymentsRouter } from './api/server/express/routers/PaymentRouter';

// definiendo punto de entrada
const expressApi = containerDI.getContainer().resolve(ExpressApi);
containerDI.getContainer().resolve(SetGlobalParameters).execute().catch((error) => console.log('Ocurrio un problemita'));
expressApi.loadRouters('/v1', [ newsRouterV1, paymentsRouter ]);

expressApi.run();
