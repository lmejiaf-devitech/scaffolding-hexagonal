import { RequestInit, Response } from 'node-fetch';

export interface IClientHttp {
    handleResponse<T>(response: Response): Promise<T>
    get<T>(url: string, options?: RequestInit): Promise<T>
    put<T>(url: string, data: Record<string, unknown>, headers?: Record<string, string>): Promise<T>
    post<T>(url: string, body: unknown, options?: RequestInit): Promise<T>
    remove<T>(url: string, headers?: Record<string, string>): Promise<T>
}
