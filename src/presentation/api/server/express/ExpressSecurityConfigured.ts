import { IServerSecurityConfigurer } from "@commons/presentation/IServerSecurityConfigurer";
import express, { Express, NextFunction, Request, Response } from "express";

import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import helmet from 'helmet';
import body from 'body-parser';
import compression from 'compression';


import { inject, injectable } from "inversify";
import { ILogger } from "@commons/infrastructure/ILogger";
import log4js from "log4js";

@injectable()
export class ExpressSecurityConfigured implements IServerSecurityConfigurer<Express> {

    private expressSecurityConfiguredInstance: Express;
    private iLogger: ILogger<log4js.Logger>;
    constructor(
        @inject("LoggerLog4JS") iLogger: ILogger<log4js.Logger>
    ) {
        this.expressSecurityConfiguredInstance = express();
        this.iLogger = iLogger;
    }
    
    private addRawBody(req: any, buf: any): void {
        req.rawBody = buf.toString();
    }

    loadSecurityExpressConfigured(): Express {
        this.expressSecurityConfiguredInstance.use(body.json());
        this.expressSecurityConfiguredInstance.use(helmet());
        this.expressSecurityConfiguredInstance.use(cors({ origin: 'SAMEORIGIN' }));
        this.expressSecurityConfiguredInstance.use(compression());

        this.expressSecurityConfiguredInstance.use(
            (request: Request, response: Response, next: NextFunction) => {
                let err = null;
                try {
                    decodeURIComponent(request.path);
                } catch (e) {
                    err = e;
                }
                if (err !== null) {
                    return response.status(403).send();
                }
                next();
            },
        );

        // Set "X-XSS-Protection: 0"
        this.expressSecurityConfiguredInstance.use(
            (request: Request, response: Response, next: NextFunction) => {
                response.setHeader('X-XSS-Protection', '1; mode=block');
                next();
            },
        );

        this.expressSecurityConfiguredInstance.use(
            express.urlencoded({ extended: true, limit: '200mb' }),
        );

        this.expressSecurityConfiguredInstance.use(
            (request: Request, response: Response, next: NextFunction) => {
                express.json({
                    limit: '200mb',
                    verify: this.addRawBody,
                })(request, response, (err) => {
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    if (err) {
                        let code = 403;
                        switch (err.type) {
                            case 'entity.parse.failed':
                                code = 400;
                                break;
                            case 'entity.too.large':
                                code = 413;
                                break;
                            default:
                                this.iLogger.getConfiguredLogger().info('nothing');
                        }
                        response.status(code).end();
                        return;
                    }
                    next();
                });
            },
        );

        this.expressSecurityConfiguredInstance.use(
            (request: Request, response: Response, next: express.NextFunction) => {
                if (
                    request.method.toUpperCase() === 'POST'
                    || request.method.toUpperCase() === 'PUT'
                ) {
                    const type: string = typeof request.headers['content-type'] !== 'undefined'
                        ? request.headers['content-type']
                        : '0';
                    if (type.includes('ultipart/form-data;')) {
                        return next();
                    }
                    if (
                        typeof request.headers['content-type'] !== 'undefined'
                        && [
                            'application/json',
                            'multipart/form-data;',
                            'application/json;charset=UTF-8',
                            'application/json;charset=utf-8',
                        ].includes(type)
                    ) {
                        return next();
                    }
                    return response.status(415).end();
                }
                return next();
            },
        );

        this.expressSecurityConfiguredInstance.use((
            request: Request,
            response: Response,
            next: NextFunction,
        ) => {
            const allowedOrigins = ['http://localhost'];
            const origin: string = request.headers.origin!;

            if (allowedOrigins.includes(origin)) {
                response.setHeader('Access-Control-Allow-Origin', origin);
            }
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
            response.setHeader(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept',
            );
            response.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });

        const method: string = ':method'.padStart(5).padEnd(5);
        this.expressSecurityConfiguredInstance.use(
            morgan(
                `${colors.cyan('[ REQS ]')} *** ${colors.bgGreen(
                    colors.bold(method),
                )} :url :status :response-time ms - :res[content-length]`,
            ),
        );

        this.expressSecurityConfiguredInstance.use(
            (_error: any, req: any, res: Response, next: any) => {
                this.iLogger.getConfiguredLogger().error('ERROR DEFECTO', _error);
                res.status(403).send();
            },
        );

        return this.expressSecurityConfiguredInstance;
    }
}