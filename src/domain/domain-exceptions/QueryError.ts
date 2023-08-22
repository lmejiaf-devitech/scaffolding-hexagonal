export class QueryErorr extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QueryError';
  }
}
