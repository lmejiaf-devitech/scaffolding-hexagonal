export interface IMapper<I, O> {
    mapTo(params: I): O;
}