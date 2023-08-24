import { injectable } from 'inversify';

@injectable()
export class Parameters {
  private maximoNumeroReenvios: number;

  private maximoTiempoReenvio: number;

  private tiempoMaximoPrimerConsultaPago: number;

  private tiempoMaximoPrimerReenvio: number;

  private maximoNumeroConsultaPago: number;

  private maximoTiempoConsultaPago: number;

  // Getters and Setters
  public getMaximoNumeroReenvios(): number {
    return this.maximoNumeroReenvios;
  }

  public setMaximoNumeroReenvios(maximoNumeroReenvios: number): void {
    this.maximoNumeroReenvios = maximoNumeroReenvios;
  }

  public getMaximoTiempoReenvio(): number {
    return this.maximoTiempoReenvio;
  }

  public setMaximoTiempoReenvio(maximoTiempoReenvio: number): void {
    this.maximoTiempoReenvio = maximoTiempoReenvio;
  }

  public getTiempoMaximoPrimerConsultaPago(): number {
    return this.tiempoMaximoPrimerConsultaPago;
  }

  public setTiempoMaximoPrimerConsultaPago(tiempoMaximoPrimerConsultaPago: number): void {
    this.tiempoMaximoPrimerConsultaPago = tiempoMaximoPrimerConsultaPago;
  }

  public getTiempoMaximoPrimerReenvio(): number {
    return this.tiempoMaximoPrimerReenvio;
  }

  public setTiempoMaximoPrimerReenvio(tiempoMaximoPrimerReenvio: number): void {
    this.tiempoMaximoPrimerReenvio = tiempoMaximoPrimerReenvio;
  }

  public getMaximoNumeroConsultaPago(): number {
    return this.maximoNumeroConsultaPago;
  }

  public setMaximoNumeroConsultaPago(maximoNumeroConsultaPago: number): void {
    this.maximoNumeroConsultaPago = maximoNumeroConsultaPago;
  }

  public getMaximoTiempoConsultaPago(): number {
    return this.maximoTiempoConsultaPago;
  }

  public setMaximoTiempoConsultaPago(maximoTiempoConsultaPago: number): void {
    this.maximoTiempoConsultaPago = maximoTiempoConsultaPago;
  }
}
