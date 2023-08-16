export interface IContainerDI<T> {
    registerDependencies(): void;
    getContainer(): T;
}