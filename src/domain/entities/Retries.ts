export class Retries {
  idSeguimiento: string;

  idReintento: number;

  fechaReintento: Date;

  idMovimento?: number;

  getidSeguimiento(): string {
    return this.idSeguimiento;
  }

  setidSeguimiento(idSeguimiento: string): void {
    this.idSeguimiento = idSeguimiento;
  }

  getidReintento(): number {
    return this.idReintento;
  }

  setidReintento(idReintento: number): void {
    this.idReintento = idReintento;
  }

  getfechaReintento(): Date {
    return this.fechaReintento;
  }

  setfechaReintento(fechaReintento: Date): void {
    this.fechaReintento = fechaReintento;
  }
}
