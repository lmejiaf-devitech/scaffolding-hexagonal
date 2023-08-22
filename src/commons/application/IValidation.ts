export interface IValidation<I> {
    validate(params: I): boolean;
}
