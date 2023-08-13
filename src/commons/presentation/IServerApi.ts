export interface IServerApi<T> {
    run(): void;
    loadRouters(versionPrefixApi: string, routers: T): void;
}