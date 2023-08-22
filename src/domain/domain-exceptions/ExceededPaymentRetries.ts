export class ExceededPaymentRetries extends Error {
  constructor() {
    super('Se excedió el número de intentos de pago');
    this.name = 'ExceededPaymentRetries';
  }
}
