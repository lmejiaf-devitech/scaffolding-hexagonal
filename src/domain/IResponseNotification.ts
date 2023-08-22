interface Cliente {
  tipoDocumento: string;
  numeroDocumento: string;
}

interface ClienteFactura {
  tipoDocumento: string;
  numeroDocumento: string;
  correoElectronico: string;
  direccion: string;
  nombre: string;
  telefono: string;
}

export interface ITransaccion {
  codigoHttp: number;
  idSeguimiento: string;
  idTransaccion: string;
  codigoEds: string;
  cara: string;
  cliente: Cliente;
  clienteFactura: ClienteFactura;
  escenario: string;
  estadoPago: string;
  facturaElectronica: boolean;
  fechaFinVenta: string;
  manguera: string;
  medioPago: string;
  monto: number;
  surtidor: string;
}
