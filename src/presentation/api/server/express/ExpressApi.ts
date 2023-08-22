import { injectable, inject } from 'inversify';
import { IServerSecurityConfigurer } from '@commons/presentation/IServerSecurityConfigurer';
import express, { Express, Router } from 'express';
import { IServerApi } from '@commons/presentation/IServerApi';

@injectable()
export class ExpressApi implements IServerApi<Array<Router>> {
  private iServerSecurityConfigurer: IServerSecurityConfigurer<Express>;

  private securityExpressInstance: Express;

  constructor(
        @inject('ExpressSecurityConfigured') iServerSecurityConfigurer: IServerSecurityConfigurer<Express>,
  ) {
    this.iServerSecurityConfigurer = iServerSecurityConfigurer;
    this.securityExpressInstance = this.iServerSecurityConfigurer.loadSecurityExpressConfigured();
  }

  loadRouters(versionPrefixApi: string, routers: Array<Router>) {
    this.securityExpressInstance.use(versionPrefixApi, ...routers);
  }

  run(): void {
    this.securityExpressInstance.listen(8078, '127.0.0.1', () => {
      console.log('###############################################');
      console.log('##########  EXPRESS API RUNNING  ##############');
      console.log('###############################################');
      console.log(`              PORT::${8078}                    `);
      console.log('###############################################');
    });
  }
}
