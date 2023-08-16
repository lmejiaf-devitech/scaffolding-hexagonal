export interface IClientHttp {
    handle<T>(): Promise<T>
}