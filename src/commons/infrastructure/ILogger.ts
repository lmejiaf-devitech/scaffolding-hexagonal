export interface ILogger<T> {
    configure(): void;
    getConfiguredLogger(): T;
}
