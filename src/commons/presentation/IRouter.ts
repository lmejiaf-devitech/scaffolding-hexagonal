export interface IRouter<T> {
    registerRouter(): void;
    getRouter(): T;
}