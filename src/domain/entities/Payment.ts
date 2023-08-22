export class Payment {
  manguera: number;

  surtidor: number;

  monto: number;

  codigoEDS: string;

  fechaFinVenta: Date;

  public getManguera(): number {
    return this.manguera;
  }

  public setManguera(manguera: number): void {
    this.manguera = manguera;
  }

  public getSurtidor(): number {
    return this.surtidor;
  }

  public setSurtidor(surtidor: number): void {
    this.surtidor = surtidor;
  }

  public getMonto(): number {
    return this.monto;
  }

  public setMonto(monto: number): void {
    this.monto = monto;
  }

  public getcodigoEDS(): string {
    return this.codigoEDS;
  }

  public setcodigoEDS(codigoEDS: string): void {
    this.codigoEDS = codigoEDS;
  }

  public getFechaFinVenta(): Date {
    return this.fechaFinVenta;
  }

  public setFechaFinVenta(fechaFinVenta: Date): void {
    this.fechaFinVenta = fechaFinVenta;
  }
}
