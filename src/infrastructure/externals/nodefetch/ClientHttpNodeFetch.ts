/* eslint-disable @typescript-eslint/naming-convention */
import { IClientHttp } from '@commons/infrastructure/IClientHttp';
import { ILogger } from '@commons/infrastructure/ILogger';
import { inject, injectable } from 'inversify';
import { Logger } from 'log4js';
import fetch, { RequestInit, Response } from 'node-fetch';

@injectable()
export class ClientHttpNodeFetch implements IClientHttp {
  private iLogger: ILogger<Logger>;

  constructor(
    @inject('LoggerLog4JS') iLogger: ILogger<Logger>,
  ) {
    this.iLogger = iLogger;
  }

  handleResponse = async<T>(response: Response): Promise<T> => {
    if (!response.ok) {
      const errorBody = await response.json() ?? response.text();
      return errorBody as unknown as T;
      // throw new Error(`[ :: HTTP Error :: ] ${response.status}:> ${errorBody}`);
    }
    let jsonResponse: Promise<Response> | null;

    try {
      jsonResponse = await response.json();
    } catch (error) {
      jsonResponse = null;
    }
    const res = jsonResponse || {
      url        : response.url,
      status     : response.status,
      statusText : response.statusText,
    };
    this.iLogger.getConfiguredLogger().info(`[ :: HTTP Response :: ] -> ${JSON.stringify(res)}`);
    return res as T;
  };

  get = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, { method: 'get', ...options });
    return this.handleResponse<T>(response);
  };

  put = async <T>(url: string, data: Record<string, unknown>, headers?: Record<string, string>): Promise<T> => {
    const response = await fetch(url, {
      method : 'put',
      headers,
      body   : JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  };

  post = async<T>(url: string, body: unknown, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, {
      method  : 'post',
      body    : JSON.stringify(body),
      headers : { 'Content-Type': 'application/json' },
      ...options,
    });
    return this.handleResponse<T>(response);
  };

  remove = async <T>(url: string, headers?: Record<string, string>): Promise<T> => {
    const response = await fetch(url, {
      method: 'delete',
      headers,
    });
    return this.handleResponse<T>(response);
  };
}
