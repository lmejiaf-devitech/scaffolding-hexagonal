export class PaymentDataNotFound extends Error {
  constructor() {
    super('No se encontraron los datos del movimiento');
  }
}
