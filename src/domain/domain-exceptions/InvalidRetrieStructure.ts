export class InvalidRetrieStructure extends Error {
  constructor(message: string) {
    super('El objeto de reintento no tiene la estructura correcta');
  }
}
