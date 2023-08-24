/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-shadow */
export enum TIPO_RESPUESTA {
  RESPONSE = 1,
  REQUEST = 2,
}

export enum TIPO_ENVIO {
  REENVIO = 1,
  REINTENTO = 2,
}

export enum ESTATUS_PAGO {
  PENDIENTE = 1,
  APROBADOS = 2,
  EXPIRADOS = 3,
  RECHAZADOS = 4,
  RECHAZADO_POR_FALLA = 5,
}
export enum ESTADOS_PAGO {
  EN_ESPERA = 1,
  PENDIENTE = 2,
  PROCESADO = 3,
}
