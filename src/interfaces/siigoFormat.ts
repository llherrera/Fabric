import { validateLength, validateDecimals, validateNIT, validateCode, validateLetter } from "../utils/functions.utils";
import { ErrorMessages } from "src/utils/constants";

export class SiigoFormat1 {
    TIPO_DE_COMPROBANTE_OBLIGATORIO: string;                    // len 1 (F, G o P)
    CODIGO_COMPROBANTE_OBLIGATORIO: number;                     // len 3
    NUMERO_DE_DOCUMENTO: number;                                // len 11
    CUENTA_CONTABLE_OBLIGATORIO: number;                        // len 10
    DEBITO_O_CREDITO_OBLIGATORIO: string;                       // len 1
    VALOR_DE_LA_SECUENCIA_OBLIGATORIO: number;                  // len 13 y 2 decimales
    ANIO_DEL_DOCUMENTO: number;                                 // len 4
    MES_DEL_DOCUMENTO: number;                                  // len 2
    DIA_DEL_DOCUMENTO: number;                                  // len 2
    CODIGO_DEL_VENDEDOR: number;                                // len 4
    CODIGO_DE_LA_CIUDAD: number;                                // len 4
    CODIGO_DE_LA_ZONA: number;                                  // len 3
    SECUENCIA: number;                                          // len 5
    CENTRO_DE_COSTO: number;                                    // len 4
    SUBCENTRO_DE_COSTO: number;                                 // len 3
    NIT: number;                                                // len 13 (sin digito de verificacion)
    SUCURSAL: number;                                           // len 3
    DESCRIPCION_DE_LA_SECUENCIA: string;                        // len 50
    NUMERO_DE_CHEQUE: number;                                   // len 11 (solo se usa para egresos, en los demas docs debe ir 0)
    COMPROBANTE_ANULADO: string;                                // len 1 (S o N)
    CODIGO_DEL_MOTIVO_DE_DEVOLUCION: number;                    // len 4
    FORMA_DE_PAGO: number;                                      // len 4
    VALOR_DEL_CARGO_1_DE_LA_SECUENCIA: number;                  // len 13 y 2 decimales
    VALOR_DEL_CARGO_2_DE_LA_SECUENCIA: number;                  // len 13 y 2 decimales
    VALOR_DEL_DESCUENTO_1_DE_LA_SECUENCIA: number;              // len 13 y 2 decimales
    VALOR_DEL_DESCUENTO_2_DE_LA_SECUENCIA: number;              // len 13 y 2 decimales
    VALOR_DEL_DESCUENTO_3_DE_LA_SECUENCIA: number;              // len 13 y 2 decimales
    FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR: string;            // len 5 (una letra y 3 numeros separada por -)
    NUMERO_DE_FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR: number;  // len 11
    PREFIJO_DE_ORDER_REFERENCE: string;                         // len 10 (digitar dato solo en la primera secuencia del documento)
    CONSECUTIVO_DE_ORDER_REFERENCE: string;                     // len 40 (digitar dato solo en la primera secuencia del documento)
    PREFIJO_ORDEN_DE_ENTREGA: string;                           // len 10 (digitar dato solo en la primera secuencia del documento)
    NUMERO_ORDEN_DE_ENTREGA: string;                            // len 40 (digitar dato solo en la primera secuencia del documento)
    ANIO_FECHA_DE_ORDEN_DE_ENTREGA: number;                     // len 4
    MES_FECHA_DE_ORDEN_DE_ENTREGA: number;                      // len 2
    DIA_FECHA_DE_ORDEN_DE_ENTREGA: number;                      // len 2
    INGRESOS_PARA_TERCEROS: string;                             // len 1 (solo T de tercero)
    FECHA_ACTUALIZACION_DEL_DOCUMENTO: number;                  // len 8
    HORA_DE_ACTUALIZACION_DEL_DOCUMENTO: number;                // len 6
    PREFIJO_ORDEN_DE_ENTREGA2: string;                          // len 10 (digitar dato solo en la primera secuencia del documento)
    NUMERO_ORDEN_DE_ENTREGA2: string;                           // len 40 (digitar dato solo en la primera secuencia del documento)
    ANIO_FECHA_DE_ORDEN_DE_ENTREGA2: number;                    // len 4
    MES_FECHA_DE_ORDEN_DE_ENTREGA2: number;                     // len 2
    DIA_FECHA_DE_ORDEN_DE_ENTREGA2: number;                     // len 2
    PREFIJO_ORDEN_DE_ENTREGA3: string;                          // len 10 (digitar dato solo en la primera secuencia del documento)
    NUMERO_ORDEN_DE_ENTREGA3: string;                           // len 40 (digitar dato solo en la primera secuencia del documento)
    ANIO_FECHA_DE_ORDEN_DE_ENTREGA3: number;                    // len 4
    MES_FECHA_DE_ORDEN_DE_ENTREGA3: number;                     // len 2
    DIA_FECHA_DE_ORDEN_DE_ENTREGA3: number;                     // len 2
    PREFIJO_ORDEN_DE_ENTREGA4: string;                          // len 10 (digitar dato solo en la primera secuencia del documento)
    NUMERO_ORDEN_DE_ENTREGA4: string;                           // len 40 (digitar dato solo en la primera secuencia del documento)
    ANIO_FECHA_DE_ORDEN_DE_ENTREGA4: number;                    // len 4
    MES_FECHA_DE_ORDEN_DE_ENTREGA4: number;                     // len 2
    DIA_FECHA_DE_ORDEN_DE_ENTREGA4: number;                     // len 2
    PREFIJO_ORDEN_DE_ENTREGA5: string;                          // len 10 (digitar dato solo en la primera secuencia del documento)
    NUMERO_ORDEN_DE_ENTREGA5: string;                           // len 40 (digitar dato solo en la primera secuencia del documento)
    ANIO_FECHA_DE_ORDEN_DE_ENTREGA5: number;                    // len 4
    MES_FECHA_DE_ORDEN_DE_ENTREGA5: number;                     // len 2
    DIA_FECHA_DE_ORDEN_DE_ENTREGA5: number;                     // len 2
    PORCENTAJE_ALIMENTOS_ULTRAPROCESADOS: number;               // len 3 y 3 decimales
    VALOR_ALIMENTOS_ULTRAPROCESADOS: number;                    // len 13 y 3 decimales
    VALOR_BEBIDAS_AZUCARADAS: number;                           // len 13 y 3 decimales
    PORCENTAJE_DEL_IVA_DE_LA_SECUENCIA: number;                 // len 3 y 2 decimales
    VALOR_DE_IVA_DE_LA_SECUENCIA: number;                       // len 11 y 2 decimales
    BASE_DE_RETENCION: number;                                  // len 13 y 5 decimales
    BASE_PARA_CUENTAS_MARCADAS_COMO_RETEIVA: number;            // len 13 y 2 decimales
    SECUENCIA_GRAVADA_O_EXCENTA: string;                        // len 1
    PORCENTAJE_AIU: number;                                     // len 5 y 5 decimales
    BASE_IVA_AIU: number;                                       // len 13 y 2 decimales
    VALOR_TOTAL_IMPOCONSUMO_DE_LA_SECUENCIA: number;            // len 11 y 5 decimales
    LINEA_PRODUCTO: number;                                     // len 3
    GRUPO_PRODUCTO: number;                                     // len 4
    CODIGO_PRODUCTO: number;                                    // len 6
    CANTIDAD: number;                                           // len 13 y 5 decimales
    CANTIDAD_DOS: number;                                       // len 13 y 5 decimales
    CODIGO_DE_LA_BODEGA: number;                                // len 4
    CODIGO_DE_LA_UBICACION: number;                             // len 3
    CANTIDAD_DE_FACTOR_DE_CONVERSION: number;                   // len 13 y 5 decimales
    OPERADOR_DE_FACTOR_DE_CONVERSION: number;                   // len 1 (del 1 al 5)
    VALOR_DEL_FACTOR_DE_CONVERSION: number;                     // len 5 y 5 decimales
    CLASIFICACION_1: string;                                    // len 10
    CLASIFICACION_2: string;                                    // len 8
    GRUPO_ACTIVOS: number;                                      // len 4
    CODIGO_ACTIVO: number;                                      // len 5
    ADICION_O_MEJORA: string;                                   // len 1 (A o vacio)
    VECES_ADICIONALES_A_DEPRECIAR_POR_ADICION_O_MEJORA: number; // len 3 (aplica solo a registros marcados como adicion o mejora, sino se deja en blanco)
    VECES_A_DEPRECIAR_NIIF: number;                             // len 3
    NUMERO_DEL_DOCUMENTO_DEL_PROVEEDOR: number;                 // len 11
    PREFIJO_DEL_DOCUMENTO_DEL_PROVEEDOR: string;                // len 10
    ANIO_DOCUMENTO_DEL_PROVEEDOR: number;                       // len 4
    MES_DOCUMENTO_DEL_PROVEEDOR: number;                        // len 2
    DIA_DOCUMENTO_DEL_PROVEEDOR: number;                        // len 2
    TIPO_DOCUMENTO_DE_PEDIDO: string;                           // len 1
    CODIGO_COMPROBANTE_DE_PEDIDO: number;                       // len 3
    NUMERO_DE_COMPROBANTE_PEDIDO: number;                       // len 11
    SECUENCIA_DE_PEDIDO: number;                                // len 3 (maximo 250)
    TIPO_DE_MONEDA_ELABORACION: number;                         // len 2 (aplica para definir la moneda con la cual se elabiro el documento)
    TIPO_Y_COMPROBANTE_CRUCE: string;                           // len 5 (una letra y 3 numeros separada por -)
    NUMERO_DE_DOCUMENTO_CRUCE: number;                          // len 11
    NUMERO_DE_VENCIMIENTO: number;                              // len 3 (maximo 250)
    ANIO_VENCIMIENTO_DE_DOCUMENTO_CRUCE: number;                // len 4
    MES_VENCIMIENTO_DE_DOCUMENTO_CRUCE: number;                 // len 2
    DIA_VENCIMIENTO_DE_DOCUMENTO_CRUCE: number;                 // len 2
    NUMERO_DE_CAJA_ASOCIADA_AL_COMPROBANTE: number;             // len 3
    DESCRIPCION_DE_COMENTARIOS: string;                         // len 228
    DESCRIPCION_LARGA: string;                                  // len 3000
    INCONTERM: string;                                          // len 10 (condicion de entrega: Factura de exportacion)
    DESCRIPCION_EXPORTACION: string;                            // len 50
    MEDIO_DE_TRANSPORTE: string;                                // len 50
    PAIS_DE_ORIGEN: number;                                     // len 3
    CIUDAD_DE_ORIGEN: number;                                   // len 4
    PAIS_DESTINO: number;                                       // len 3
    CIUDAD_DESTINO: number;                                     // len 4
    PESO_NETO: number;                                          // len 10 y 3 decimales
    PESO_BRUTO: number;                                         // len 10 y 3 decimales
    UNIDAD_DE_MEDIDA_NETO: string;                              // len 10
    UNIDAD_DE_MEDIDA_BRUTO: string;                             // len 10
    CONCEPTO_FACTURACION_EN_BLOQUE: number;                     // len 4
    DATOS_ESTABLEC_L_LOCAL_O_OFICINA: string;                   // len 1 (L o O)
    NUMERO_ESTABLECIMIENTO: number;                             // len 10

    constructor(
        TIPO_DE_COMPROBANTE_OBLIGATORIO: string,
        CODIGO_COMPROBANTE_OBLIGATORIO: number,
        NUMERO_DE_DOCUMENTO: number,
        CUENTA_CONTABLE_OBLIGATORIO: number,
        DEBITO_O_CREDITO_OBLIGATORIO: string,
        VALOR_DE_LA_SECUENCIA_OBLIGATORIO: number,
        ANIO_DEL_DOCUMENTO: number,
        MES_DEL_DOCUMENTO: number,
        DIA_DEL_DOCUMENTO: number,
        CODIGO_DEL_VENDEDOR: number,
        CODIGO_DE_LA_CIUDAD: number,
        CODIGO_DE_LA_ZONA: number,
        SECUENCIA: number,
        CENTRO_DE_COSTO: number,
        SUBCENTRO_DE_COSTO: number,
        NIT: number,
        SUCURSAL: number,
        DESCRIPCION_DE_LA_SECUENCIA: string,
        NUMERO_DE_CHEQUE: number,
        COMPROBANTE_ANULADO: string,
        CODIGO_DEL_MOTIVO_DE_DEVOLUCION: number,
        FORMA_DE_PAGO: number,
        VALOR_DEL_CARGO_1_DE_LA_SECUENCIA: number,
        VALOR_DEL_CARGO_2_DE_LA_SECUENCIA: number,
        VALOR_DEL_DESCUENTO_1_DE_LA_SECUENCIA: number,
        VALOR_DEL_DESCUENTO_2_DE_LA_SECUENCIA: number,
        VALOR_DEL_DESCUENTO_3_DE_LA_SECUENCIA: number,
        FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR: string,
        NUMERO_DE_FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR: number,
        PREFIJO_DE_ORDER_REFERENCE: string,
        CONSECUTIVO_DE_ORDER_REFERENCE: string,
        PREFIJO_ORDEN_DE_ENTREGA: string,
        NUMERO_ORDEN_DE_ENTREGA: string,
        ANIO_FECHA_DE_ORDEN_DE_ENTREGA: number,
        MES_FECHA_DE_ORDEN_DE_ENTREGA: number,
        DIA_FECHA_DE_ORDEN_DE_ENTREGA: number,
        INGRESOS_PARA_TERCEROS: string,
        FECHA_ACTUALIZACION_DEL_DOCUMENTO: number,
        HORA_DE_ACTUALIZACION_DEL_DOCUMENTO: number,
        PREFIJO_ORDEN_DE_ENTREGA2: string,
        NUMERO_ORDEN_DE_ENTREGA2: string,
        ANIO_FECHA_DE_ORDEN_DE_ENTREGA2: number,
        MES_FECHA_DE_ORDEN_DE_ENTREGA2: number,
        DIA_FECHA_DE_ORDEN_DE_ENTREGA2: number,
        PREFIJO_ORDEN_DE_ENTREGA3: string,
        NUMERO_ORDEN_DE_ENTREGA3: string,
        ANIO_FECHA_DE_ORDEN_DE_ENTREGA3: number,
        MES_FECHA_DE_ORDEN_DE_ENTREGA3: number,
        DIA_FECHA_DE_ORDEN_DE_ENTREGA3: number,
        PREFIJO_ORDEN_DE_ENTREGA4: string,
        NUMERO_ORDEN_DE_ENTREGA4: string,
        ANIO_FECHA_DE_ORDEN_DE_ENTREGA4: number,
        MES_FECHA_DE_ORDEN_DE_ENTREGA4: number,
        DIA_FECHA_DE_ORDEN_DE_ENTREGA4: number,
        PREFIJO_ORDEN_DE_ENTREGA5: string,
        NUMERO_ORDEN_DE_ENTREGA5: string,
        ANIO_FECHA_DE_ORDEN_DE_ENTREGA5: number,
        MES_FECHA_DE_ORDEN_DE_ENTREGA5: number,
        DIA_FECHA_DE_ORDEN_DE_ENTREGA5: number,
        PORCENTAJE_ALIMENTOS_ULTRAPROCESADOS: number,
        VALOR_ALIMENTOS_ULTRAPROCESADOS: number,
        VALOR_BEBIDAS_AZUCARADAS: number,
        PORCENTAJE_DEL_IVA_DE_LA_SECUENCIA: number,
        VALOR_DE_IVA_DE_LA_SECUENCIA: number,
        BASE_DE_RETENCION: number,
        BASE_PARA_CUENTAS_MARCADAS_COMO_RETEIVA: number,
        SECUENCIA_GRAVADA_O_EXCENTA: string,
        PORCENTAJE_AIU: number,
        BASE_IVA_AIU: number,
        VALOR_TOTAL_IMPOCONSUMO_DE_LA_SECUENCIA: number,
        LINEA_PRODUCTO: number,
        GRUPO_PRODUCTO: number,
        CODIGO_PRODUCTO: number,
        CANTIDAD: number,
        CANTIDAD_DOS: number,
        CODIGO_DE_LA_BODEGA: number,
        CODIGO_DE_LA_UBICACION: number,
        CANTIDAD_DE_FACTOR_DE_CONVERSION: number,
        OPERADOR_DE_FACTOR_DE_CONVERSION: number,
        VALOR_DEL_FACTOR_DE_CONVERSION: number,
        CLASIFICACION_1: string,
        CLASIFICACION_2: string,
        GRUPO_ACTIVOS: number,
        CODIGO_ACTIVO: number,
        ADICION_O_MEJORA: string,
        VECES_ADICIONALES_A_DEPRECIAR_POR_ADICION_O_MEJORA: number,
        VECES_A_DEPRECIAR_NIIF: number,
        NUMERO_DEL_DOCUMENTO_DEL_PROVEEDOR: number,
        PREFIJO_DEL_DOCUMENTO_DEL_PROVEEDOR: string,
        ANIO_DOCUMENTO_DEL_PROVEEDOR: number,
        MES_DOCUMENTO_DEL_PROVEEDOR: number,
        DIA_DOCUMENTO_DEL_PROVEEDOR: number,
        TIPO_DOCUMENTO_DE_PEDIDO: string,
        CODIGO_COMPROBANTE_DE_PEDIDO: number,
        NUMERO_DE_COMPROBANTE_PEDIDO: number,
        SECUENCIA_DE_PEDIDO: number,
        TIPO_DE_MONEDA_ELABORACION: number,
        TIPO_Y_COMPROBANTE_CRUCE: string,
        NUMERO_DE_DOCUMENTO_CRUCE: number,
        NUMERO_DE_VENCIMIENTO: number,
        ANIO_VENCIMIENTO_DE_DOCUMENTO_CRUCE: number,
        MES_VENCIMIENTO_DE_DOCUMENTO_CRUCE: number,
        DIA_VENCIMIENTO_DE_DOCUMENTO_CRUCE: number,
        NUMERO_DE_CAJA_ASOCIADA_AL_COMPROBANTE: number,
        DESCRIPCION_DE_COMENTARIOS: string,
        DESCRIPCION_LARGA: string,
        INCONTERM: string,
        DESCRIPCION_EXPORTACION: string,
        MEDIO_DE_TRANSPORTE: string,
        PAIS_DE_ORIGEN: number,
        CIUDAD_DE_ORIGEN: number,
        PAIS_DESTINO: number,
        CIUDAD_DESTINO: number,
        PESO_NETO: number,
        PESO_BRUTO: number,
        UNIDAD_DE_MEDIDA_NETO: string,
        UNIDAD_DE_MEDIDA_BRUTO: string,
        CONCEPTO_FACTURACION_EN_BLOQUE: number,
        DATOS_ESTABLEC_L_LOCAL_O_OFICINA: string,
        NUMERO_ESTABLECIMIENTO: number
    ) {
        if (!validateLength(TIPO_DE_COMPROBANTE_OBLIGATORIO, 1)) throw new Error(ErrorMessages.length.tipoComprobante);
        if (!validateLength(CODIGO_COMPROBANTE_OBLIGATORIO.toString(), 3)) throw new Error(ErrorMessages.length.codigoComprobante);
        if (!validateLength(NUMERO_DE_DOCUMENTO.toString(), 11)) throw new Error(ErrorMessages.length.numeroComprobante);
        if (!validateLength(CUENTA_CONTABLE_OBLIGATORIO.toString(), 10)) throw new Error(ErrorMessages.length.cuantaContable);
        if (!validateLength(DEBITO_O_CREDITO_OBLIGATORIO, 1)) throw new Error(ErrorMessages.length.debitoCredito);
        if (!validateDecimals(VALOR_DE_LA_SECUENCIA_OBLIGATORIO, 13, 2)) throw new Error(ErrorMessages.length.valorSecuencia);
        if (!validateLength(ANIO_DEL_DOCUMENTO.toString(), 4)) throw new Error(ErrorMessages.length.anioDocumento);
        if (!validateLength(MES_DEL_DOCUMENTO.toString(), 2)) throw new Error(ErrorMessages.length.mesDocumento);
        if (!validateLength(DIA_DEL_DOCUMENTO.toString(), 2)) throw new Error(ErrorMessages.length.diaDocumento);
        if (!validateLength(CODIGO_DEL_VENDEDOR.toString(), 4)) throw new Error(ErrorMessages.length.codigoVendedor);
        if (!validateLength(CODIGO_DE_LA_CIUDAD.toString(), 4)) throw new Error(ErrorMessages.length.codigoCiudad);
        if (!validateLength(CODIGO_DE_LA_ZONA.toString(), 3)) throw new Error(ErrorMessages.length.codigoZona);
        if (!validateLength(SECUENCIA.toString(), 5)) throw new Error(ErrorMessages.length.secuencia);
        if (!validateLength(CENTRO_DE_COSTO.toString(), 4)) throw new Error(ErrorMessages.length.centroCosto);
        if (!validateLength(SUBCENTRO_DE_COSTO.toString(), 3)) throw new Error(ErrorMessages.length.subcentroCosto);
        if (!validateNIT(NIT.toString(), 13)) throw new Error(ErrorMessages.length.NIT);
        if (!validateLength(SUCURSAL.toString(), 3)) throw new Error(ErrorMessages.length.sucursal);
        if (!validateLength(DESCRIPCION_DE_LA_SECUENCIA, 50)) throw new Error(ErrorMessages.length.descripcionSecuencia);
        if (!validateLength(NUMERO_DE_CHEQUE.toString(), 11)) throw new Error(ErrorMessages.length.numeroCheque);
        if (!validateLength(COMPROBANTE_ANULADO, 1)) throw new Error(ErrorMessages.length.comprobanteAnulado);
        if (!validateLength(CODIGO_DEL_MOTIVO_DE_DEVOLUCION.toString(), 4)) throw new Error(ErrorMessages.length.codigoMotivoDevolucion);
        if (!validateLength(FORMA_DE_PAGO.toString(), 4)) throw new Error(ErrorMessages.length.formaPago);
        if (!validateDecimals(VALOR_DEL_CARGO_1_DE_LA_SECUENCIA, 13, 2)) throw new Error(ErrorMessages.length.valorCargoSecuencia);
        if (!validateDecimals(VALOR_DEL_CARGO_2_DE_LA_SECUENCIA, 13, 2)) throw new Error(ErrorMessages.length.valorCargoSecuencia);
        if (!validateDecimals(VALOR_DEL_DESCUENTO_1_DE_LA_SECUENCIA, 13, 2)) throw new Error(ErrorMessages.length.valorDescuentoSecuencia);
        if (!validateDecimals(VALOR_DEL_DESCUENTO_2_DE_LA_SECUENCIA, 13, 2)) throw new Error(ErrorMessages.length.valorDescuentoSecuencia);
        if (!validateDecimals(VALOR_DEL_DESCUENTO_3_DE_LA_SECUENCIA, 13, 2)) throw new Error(ErrorMessages.length.valorDescuentoSecuencia);
        if (!validateCode(FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR)) throw new Error(ErrorMessages.length.facturaElectronica);
        if (!validateLength(NUMERO_DE_FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR.toString(), 11)) throw new Error(ErrorMessages.length.numeroFacturaElectronica);
        if (!validateLength(PREFIJO_DE_ORDER_REFERENCE, 10)) throw new Error(ErrorMessages.length.prefijoOrden);
        if (!validateLength(CONSECUTIVO_DE_ORDER_REFERENCE, 40)) throw new Error(ErrorMessages.length.consecutivoOrden);
        if (!validateLength(PREFIJO_ORDEN_DE_ENTREGA, 10)) throw new Error(ErrorMessages.length.prefijoOrdenEntrega);
        if (!validateLength(NUMERO_ORDEN_DE_ENTREGA, 4)) throw new Error(ErrorMessages.length.numeroOrdenEntrega);
        if (!validateLength(ANIO_FECHA_DE_ORDEN_DE_ENTREGA.toString(), 4)) throw new Error(ErrorMessages.length.anioFechaOrdenEntrega);
        if (!validateLength(MES_FECHA_DE_ORDEN_DE_ENTREGA.toString(), 2)) throw new Error(ErrorMessages.length.mesFechaOrdenEntrega);
        if (!validateLength(DIA_FECHA_DE_ORDEN_DE_ENTREGA.toString(), 2)) throw new Error(ErrorMessages.length.diaFechaOrdenEntrega);
        if (!validateLength(INGRESOS_PARA_TERCEROS, 1)) throw new Error(ErrorMessages.length.ingresoTerceros);
        if (!validateLength(FECHA_ACTUALIZACION_DEL_DOCUMENTO.toString(), 8)) throw new Error(ErrorMessages.length.fechaActualizacionDoc);
        if (!validateLength(HORA_DE_ACTUALIZACION_DEL_DOCUMENTO.toString(), 6)) throw new Error(ErrorMessages.length.horaActualizacionDoc);
        if (!validateLength(PREFIJO_ORDEN_DE_ENTREGA2, 10)) throw new Error(ErrorMessages.length.prefijoOrdenEntrega);
        if (!validateLength(NUMERO_ORDEN_DE_ENTREGA2, 40)) throw new Error(ErrorMessages.length.numeroOrdenEntrega);
        if (!validateLength(ANIO_FECHA_DE_ORDEN_DE_ENTREGA2.toString(), 4)) throw new Error(ErrorMessages.length.anioFechaOrdenEntrega);
        if (!validateLength(MES_FECHA_DE_ORDEN_DE_ENTREGA2.toString(), 2)) throw new Error(ErrorMessages.length.mesFechaOrdenEntrega);
        if (!validateLength(DIA_FECHA_DE_ORDEN_DE_ENTREGA2.toString(), 2)) throw new Error(ErrorMessages.length.diaFechaOrdenEntrega);
        if (!validateLength(PREFIJO_ORDEN_DE_ENTREGA3, 10)) throw new Error(ErrorMessages.length.prefijoOrdenEntrega);
        if (!validateLength(NUMERO_ORDEN_DE_ENTREGA3, 40)) throw new Error(ErrorMessages.length.numeroOrdenEntrega);
        if (!validateLength(ANIO_FECHA_DE_ORDEN_DE_ENTREGA3.toString(), 4)) throw new Error(ErrorMessages.length.anioFechaOrdenEntrega);
        if (!validateLength(MES_FECHA_DE_ORDEN_DE_ENTREGA3.toString(), 2)) throw new Error(ErrorMessages.length.mesFechaOrdenEntrega);
        if (!validateLength(DIA_FECHA_DE_ORDEN_DE_ENTREGA3.toString(), 2)) throw new Error(ErrorMessages.length.diaFechaOrdenEntrega);
        if (!validateLength(PREFIJO_ORDEN_DE_ENTREGA4, 10)) throw new Error(ErrorMessages.length.prefijoOrdenEntrega);
        if (!validateLength(NUMERO_ORDEN_DE_ENTREGA4, 40)) throw new Error(ErrorMessages.length.numeroOrdenEntrega);
        if (!validateLength(ANIO_FECHA_DE_ORDEN_DE_ENTREGA4.toString(), 4)) throw new Error(ErrorMessages.length.anioFechaOrdenEntrega);
        if (!validateLength(MES_FECHA_DE_ORDEN_DE_ENTREGA4.toString(), 2)) throw new Error(ErrorMessages.length.mesFechaOrdenEntrega);
        if (!validateLength(DIA_FECHA_DE_ORDEN_DE_ENTREGA4.toString(), 2)) throw new Error(ErrorMessages.length.diaFechaOrdenEntrega);
        if (!validateLength(PREFIJO_ORDEN_DE_ENTREGA5, 10)) throw new Error(ErrorMessages.length.prefijoOrdenEntrega);
        if (!validateLength(NUMERO_ORDEN_DE_ENTREGA5, 40)) throw new Error(ErrorMessages.length.numeroOrdenEntrega);
        if (!validateLength(ANIO_FECHA_DE_ORDEN_DE_ENTREGA5.toString(), 4)) throw new Error(ErrorMessages.length.anioFechaOrdenEntrega);
        if (!validateLength(MES_FECHA_DE_ORDEN_DE_ENTREGA5.toString(), 2)) throw new Error(ErrorMessages.length.mesFechaOrdenEntrega);
        if (!validateLength(DIA_FECHA_DE_ORDEN_DE_ENTREGA5.toString(), 2)) throw new Error(ErrorMessages.length.diaFechaOrdenEntrega);
        if (!validateDecimals(PORCENTAJE_ALIMENTOS_ULTRAPROCESADOS, 3, 3)) throw new Error(ErrorMessages.length.porcentajeAlimentosUltraprocesados);
        if (!validateDecimals(VALOR_ALIMENTOS_ULTRAPROCESADOS, 13, 3)) throw new Error(ErrorMessages.length.valorAlimentosUltraprocesados);
        if (!validateDecimals(VALOR_BEBIDAS_AZUCARADAS, 13, 3)) throw new Error(ErrorMessages.length.valorBebidasAzucaradas);
        if (!validateDecimals(PORCENTAJE_DEL_IVA_DE_LA_SECUENCIA, 3, 2)) throw new Error(ErrorMessages.length.porcentajeIVASecuencia);
        if (!validateDecimals(VALOR_DE_IVA_DE_LA_SECUENCIA, 11, 2)) throw new Error(ErrorMessages.length.valorIVASecuencia);
        if (!validateDecimals(BASE_DE_RETENCION, 13, 5)) throw new Error(ErrorMessages.length.baseRetencion);
        if (!validateDecimals(BASE_PARA_CUENTAS_MARCADAS_COMO_RETEIVA, 13, 2)) throw new Error(ErrorMessages.length.baseCuentasMarcadasReteiva);
        if (!validateLength(SECUENCIA_GRAVADA_O_EXCENTA, 1)) throw new Error(ErrorMessages.length.secuenciaGravadaExcenta);
        if (!validateDecimals(PORCENTAJE_AIU, 5, 5)) throw new Error(ErrorMessages.length.porcentajeAIU);
        if (!validateDecimals(BASE_IVA_AIU, 13, 2)) throw new Error(ErrorMessages.length.baseIVAAIU);
        if (!validateDecimals(VALOR_TOTAL_IMPOCONSUMO_DE_LA_SECUENCIA, 11, 5)) throw new Error(ErrorMessages.length.valorTotalImpocomsumo);
        if (!validateLength(LINEA_PRODUCTO.toString(), 3)) throw new Error(ErrorMessages.length.lineaProducto);
        if (!validateLength(GRUPO_PRODUCTO.toString(), 4)) throw new Error(ErrorMessages.length.grupoProducto);
        if (!validateLength(CODIGO_PRODUCTO.toString(), 6)) throw new Error(ErrorMessages.length.codigoProducto);
        if (!validateDecimals(CANTIDAD, 13, 5)) throw new Error(ErrorMessages.length.cantidad);
        if (!validateDecimals(CANTIDAD_DOS, 13, 5)) throw new Error(ErrorMessages.length.cantidad);
        if (!validateLength(CODIGO_DE_LA_BODEGA.toString(), 4)) throw new Error(ErrorMessages.length.codigoBodega);
        if (!validateLength(CODIGO_DE_LA_UBICACION.toString(), 3)) throw new Error(ErrorMessages.length.codigoUbicacion);
        if (!validateDecimals(CANTIDAD_DE_FACTOR_DE_CONVERSION, 13, 5)) throw new Error(ErrorMessages.length.cantidadFactorConversion);
        if (!validateLength(OPERADOR_DE_FACTOR_DE_CONVERSION.toString(), 1)) throw new Error(ErrorMessages.length.operadorFactorConversion);
        if (!validateDecimals(VALOR_DEL_FACTOR_DE_CONVERSION, 5, 5)) throw new Error(ErrorMessages.length.valorFactorConversion);
        if (!validateLength(CLASIFICACION_1, 10)) throw new Error(ErrorMessages.length.clasificacion);
        if (!validateLength(CLASIFICACION_2, 8)) throw new Error(ErrorMessages.length.clasificacion);
        if (!validateLength(GRUPO_ACTIVOS.toString(), 4)) throw new Error(ErrorMessages.length.gruposActivos);
        if (!validateLength(CODIGO_ACTIVO.toString(), 5)) throw new Error(ErrorMessages.length.codigoActivo);
        if (!validateLength(ADICION_O_MEJORA, 1)) throw new Error(ErrorMessages.length.adicionMejora);
        if (!validateLength(VECES_ADICIONALES_A_DEPRECIAR_POR_ADICION_O_MEJORA.toString(), 3)) throw new Error(ErrorMessages.length.vecesAdicionalesADepreciar);
        if (!validateLength(VECES_A_DEPRECIAR_NIIF.toString(), 3)) throw new Error(ErrorMessages.length.vecesADepreciarNIIF);
        if (!validateLength(NUMERO_DEL_DOCUMENTO_DEL_PROVEEDOR.toString(), 11)) throw new Error(ErrorMessages.length.numerpDocProveedor);
        if (!validateLength(PREFIJO_DEL_DOCUMENTO_DEL_PROVEEDOR.toString(), 10)) throw new Error(ErrorMessages.length.prefijoDocProveedor);
        if (!validateLength(ANIO_DOCUMENTO_DEL_PROVEEDOR.toString(), 4)) throw new Error(ErrorMessages.length.anioDocProveedor);
        if (!validateLength(MES_DOCUMENTO_DEL_PROVEEDOR.toString(), 2)) throw new Error(ErrorMessages.length.mesDocProveedor);
        if (!validateLength(DIA_DOCUMENTO_DEL_PROVEEDOR.toString(), 2)) throw new Error(ErrorMessages.length.diaDocProveedor);
        if (!validateLength(TIPO_DOCUMENTO_DE_PEDIDO, 1)) throw new Error(ErrorMessages.length.tipoDocPedido);
        if (!validateLength(CODIGO_COMPROBANTE_DE_PEDIDO.toString(), 3)) throw new Error(ErrorMessages.length.codigoComprobantePedido);
        if (!validateLength(NUMERO_DE_COMPROBANTE_PEDIDO.toString(), 11)) throw new Error(ErrorMessages.length.numeroComprobantePedido);
        if (!validateLength(SECUENCIA_DE_PEDIDO.toString(), 3)) throw new Error(ErrorMessages.length.secuenciaPedido);
        if (!validateLength(TIPO_DE_MONEDA_ELABORACION.toString(), 2)) throw new Error(ErrorMessages.length.tipoMonedaElaboracion);
        if (!validateLength(TIPO_Y_COMPROBANTE_CRUCE, 5)) throw new Error(ErrorMessages.length.tipoComprobanteCruce);
        if (!validateLength(NUMERO_DE_DOCUMENTO_CRUCE.toString(), 11)) throw new Error(ErrorMessages.length.numeroDocCruce);
        if (!validateLength(NUMERO_DE_VENCIMIENTO.toString(), 3)) throw new Error(ErrorMessages.length.numeroVencimiento);
        if (!validateLength(ANIO_VENCIMIENTO_DE_DOCUMENTO_CRUCE.toString(), 4)) throw new Error(ErrorMessages.length.anioVencimientoDocCruce);
        if (!validateLength(MES_VENCIMIENTO_DE_DOCUMENTO_CRUCE.toString(), 2)) throw new Error(ErrorMessages.length.mesVencimientoDocCruce);
        if (!validateLength(DIA_VENCIMIENTO_DE_DOCUMENTO_CRUCE.toString(), 2)) throw new Error(ErrorMessages.length.diaVencimientoDocCruce);
        if (!validateLength(NUMERO_DE_CAJA_ASOCIADA_AL_COMPROBANTE.toString(), 3)) throw new Error(ErrorMessages.length.numeroCajaAsociadaComprobante);
        if (!validateLength(DESCRIPCION_DE_COMENTARIOS, 228)) throw new Error(ErrorMessages.length.descripcionComentarios);
        if (!validateLength(DESCRIPCION_LARGA, 3000)) throw new Error(ErrorMessages.length.descripcionComentarios);
        if (!validateLength(INCONTERM, 10)) throw new Error(ErrorMessages.length.inconterm);
        if (!validateLength(DESCRIPCION_EXPORTACION, 50)) throw new Error(ErrorMessages.length.descripcionExportacion);
        if (!validateLength(MEDIO_DE_TRANSPORTE, 50)) throw new Error(ErrorMessages.length.medioTransporte);
        if (!validateLength(PAIS_DE_ORIGEN.toString(), 3)) throw new Error(ErrorMessages.length.paisOrigen);
        if (!validateLength(CIUDAD_DE_ORIGEN.toString(), 4)) throw new Error(ErrorMessages.length.ciudadOrigen);
        if (!validateLength(PAIS_DESTINO.toString(), 3)) throw new Error(ErrorMessages.length.paisDestino);
        if (!validateLength(CIUDAD_DESTINO.toString(), 4)) throw new Error(ErrorMessages.length.ciudadDestino);
        if (!validateDecimals(PESO_NETO, 10, 3)) throw new Error(ErrorMessages.length.pesoNeto);
        if (!validateDecimals(PESO_BRUTO, 10, 3)) throw new Error(ErrorMessages.length.pesoBruto);
        if (!validateLength(UNIDAD_DE_MEDIDA_NETO, 10)) throw new Error(ErrorMessages.length.unidadMedidaNeto);
        if (!validateLength(UNIDAD_DE_MEDIDA_BRUTO, 10)) throw new Error(ErrorMessages.length.unidadMedidaBruto);
        if (!validateLength(CONCEPTO_FACTURACION_EN_BLOQUE.toString(), 4)) throw new Error(ErrorMessages.length.conceptoFacturacionBloque);
        if (!validateLength(DATOS_ESTABLEC_L_LOCAL_O_OFICINA, 1)) throw new Error(ErrorMessages.length.datosEstablecimiento);
        if (!validateLength(NUMERO_ESTABLECIMIENTO.toString(), 10)) throw new Error(ErrorMessages.length.numeroEstablecimiento);
        
        
        
        
        this.TIPO_DE_COMPROBANTE_OBLIGATORIO = TIPO_DE_COMPROBANTE_OBLIGATORIO;
        this.CODIGO_COMPROBANTE_OBLIGATORIO = CODIGO_COMPROBANTE_OBLIGATORIO;
        this.NUMERO_DE_DOCUMENTO = NUMERO_DE_DOCUMENTO;
        this.CUENTA_CONTABLE_OBLIGATORIO = CUENTA_CONTABLE_OBLIGATORIO;
        this.DEBITO_O_CREDITO_OBLIGATORIO = DEBITO_O_CREDITO_OBLIGATORIO;
        this.VALOR_DE_LA_SECUENCIA_OBLIGATORIO = VALOR_DE_LA_SECUENCIA_OBLIGATORIO;
        this.ANIO_DEL_DOCUMENTO = ANIO_DEL_DOCUMENTO;
        this.MES_DEL_DOCUMENTO = MES_DEL_DOCUMENTO;
        this.DIA_DEL_DOCUMENTO = DIA_DEL_DOCUMENTO;
        this.CODIGO_DEL_VENDEDOR = CODIGO_DEL_VENDEDOR;
        this.CODIGO_DE_LA_CIUDAD = CODIGO_DE_LA_CIUDAD;
        this.CODIGO_DE_LA_ZONA = CODIGO_DE_LA_ZONA;
        this.SECUENCIA = SECUENCIA;
        this.CENTRO_DE_COSTO = CENTRO_DE_COSTO;
        this.SUBCENTRO_DE_COSTO = SUBCENTRO_DE_COSTO;
        this.NIT = NIT;
        this.SUCURSAL = SUCURSAL;
        this.DESCRIPCION_DE_LA_SECUENCIA = DESCRIPCION_DE_LA_SECUENCIA;
        this.NUMERO_DE_CHEQUE = NUMERO_DE_CHEQUE;
        this.COMPROBANTE_ANULADO = COMPROBANTE_ANULADO;
        this.CODIGO_DEL_MOTIVO_DE_DEVOLUCION = CODIGO_DEL_MOTIVO_DE_DEVOLUCION;
        this.FORMA_DE_PAGO = FORMA_DE_PAGO;
        this.VALOR_DEL_CARGO_1_DE_LA_SECUENCIA = VALOR_DEL_CARGO_1_DE_LA_SECUENCIA;
        this.VALOR_DEL_CARGO_2_DE_LA_SECUENCIA = VALOR_DEL_CARGO_2_DE_LA_SECUENCIA;
        this.VALOR_DEL_DESCUENTO_1_DE_LA_SECUENCIA = VALOR_DEL_DESCUENTO_1_DE_LA_SECUENCIA;
        this.VALOR_DEL_DESCUENTO_2_DE_LA_SECUENCIA = VALOR_DEL_DESCUENTO_2_DE_LA_SECUENCIA;
        this.VALOR_DEL_DESCUENTO_3_DE_LA_SECUENCIA = VALOR_DEL_DESCUENTO_3_DE_LA_SECUENCIA;
        this.FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR = FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR;
        this.NUMERO_DE_FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR = NUMERO_DE_FACTURA_ELECTRONICA_A_DEBITAR_ACREDITAR;
        this.PREFIJO_DE_ORDER_REFERENCE = PREFIJO_DE_ORDER_REFERENCE;
        this.CONSECUTIVO_DE_ORDER_REFERENCE = CONSECUTIVO_DE_ORDER_REFERENCE;
        this.PREFIJO_ORDEN_DE_ENTREGA = PREFIJO_ORDEN_DE_ENTREGA;
        this.NUMERO_ORDEN_DE_ENTREGA = NUMERO_ORDEN_DE_ENTREGA;
        this.ANIO_FECHA_DE_ORDEN_DE_ENTREGA = ANIO_FECHA_DE_ORDEN_DE_ENTREGA;
        this.MES_FECHA_DE_ORDEN_DE_ENTREGA = MES_FECHA_DE_ORDEN_DE_ENTREGA;
        this.DIA_FECHA_DE_ORDEN_DE_ENTREGA = DIA_FECHA_DE_ORDEN_DE_ENTREGA;
        this.INGRESOS_PARA_TERCEROS = INGRESOS_PARA_TERCEROS;
        this.FECHA_ACTUALIZACION_DEL_DOCUMENTO = FECHA_ACTUALIZACION_DEL_DOCUMENTO;
        this.HORA_DE_ACTUALIZACION_DEL_DOCUMENTO = HORA_DE_ACTUALIZACION_DEL_DOCUMENTO;
        this.PREFIJO_ORDEN_DE_ENTREGA2 = PREFIJO_ORDEN_DE_ENTREGA2;
        this.NUMERO_ORDEN_DE_ENTREGA2 = NUMERO_ORDEN_DE_ENTREGA2;
        this.ANIO_FECHA_DE_ORDEN_DE_ENTREGA2 = ANIO_FECHA_DE_ORDEN_DE_ENTREGA2;
        this.MES_FECHA_DE_ORDEN_DE_ENTREGA2 = MES_FECHA_DE_ORDEN_DE_ENTREGA2;
        this.DIA_FECHA_DE_ORDEN_DE_ENTREGA2 = DIA_FECHA_DE_ORDEN_DE_ENTREGA2;
        this.PREFIJO_ORDEN_DE_ENTREGA3 = PREFIJO_ORDEN_DE_ENTREGA3;
        this.NUMERO_ORDEN_DE_ENTREGA3 = NUMERO_ORDEN_DE_ENTREGA3;
        this.ANIO_FECHA_DE_ORDEN_DE_ENTREGA3 = ANIO_FECHA_DE_ORDEN_DE_ENTREGA3;
        this.MES_FECHA_DE_ORDEN_DE_ENTREGA3 = MES_FECHA_DE_ORDEN_DE_ENTREGA3;
        this.DIA_FECHA_DE_ORDEN_DE_ENTREGA3 = DIA_FECHA_DE_ORDEN_DE_ENTREGA3;
        this.PREFIJO_ORDEN_DE_ENTREGA4 = PREFIJO_ORDEN_DE_ENTREGA4;
        this.NUMERO_ORDEN_DE_ENTREGA4 = NUMERO_ORDEN_DE_ENTREGA4;
        this.ANIO_FECHA_DE_ORDEN_DE_ENTREGA4 = ANIO_FECHA_DE_ORDEN_DE_ENTREGA4;
        this.MES_FECHA_DE_ORDEN_DE_ENTREGA4 = MES_FECHA_DE_ORDEN_DE_ENTREGA4;
        this.DIA_FECHA_DE_ORDEN_DE_ENTREGA4 = DIA_FECHA_DE_ORDEN_DE_ENTREGA4;
        this.PREFIJO_ORDEN_DE_ENTREGA5 = PREFIJO_ORDEN_DE_ENTREGA5;
        this.NUMERO_ORDEN_DE_ENTREGA5 = NUMERO_ORDEN_DE_ENTREGA5;
        this.ANIO_FECHA_DE_ORDEN_DE_ENTREGA5 = ANIO_FECHA_DE_ORDEN_DE_ENTREGA5;
        this.MES_FECHA_DE_ORDEN_DE_ENTREGA5 = MES_FECHA_DE_ORDEN_DE_ENTREGA5;
        this.DIA_FECHA_DE_ORDEN_DE_ENTREGA5 = DIA_FECHA_DE_ORDEN_DE_ENTREGA5;
        this.PORCENTAJE_ALIMENTOS_ULTRAPROCESADOS = PORCENTAJE_ALIMENTOS_ULTRAPROCESADOS;
        this.VALOR_ALIMENTOS_ULTRAPROCESADOS = VALOR_ALIMENTOS_ULTRAPROCESADOS;
        this.VALOR_BEBIDAS_AZUCARADAS = VALOR_BEBIDAS_AZUCARADAS;
        this.PORCENTAJE_DEL_IVA_DE_LA_SECUENCIA = PORCENTAJE_DEL_IVA_DE_LA_SECUENCIA;
        this.VALOR_DE_IVA_DE_LA_SECUENCIA = VALOR_DE_IVA_DE_LA_SECUENCIA;
        this.BASE_DE_RETENCION = BASE_DE_RETENCION;
        this.BASE_PARA_CUENTAS_MARCADAS_COMO_RETEIVA = BASE_PARA_CUENTAS_MARCADAS_COMO_RETEIVA;
        this.SECUENCIA_GRAVADA_O_EXCENTA = SECUENCIA_GRAVADA_O_EXCENTA;
        this.PORCENTAJE_AIU = PORCENTAJE_AIU;
        this.BASE_IVA_AIU = BASE_IVA_AIU;
        this.VALOR_TOTAL_IMPOCONSUMO_DE_LA_SECUENCIA = VALOR_TOTAL_IMPOCONSUMO_DE_LA_SECUENCIA;
        this.LINEA_PRODUCTO = LINEA_PRODUCTO;
        this.GRUPO_PRODUCTO = GRUPO_PRODUCTO;
        this.CODIGO_PRODUCTO = CODIGO_PRODUCTO;
        this.CANTIDAD = CANTIDAD;
        this.CANTIDAD_DOS = CANTIDAD_DOS;
        this.CODIGO_DE_LA_BODEGA = CODIGO_DE_LA_BODEGA;
        this.CODIGO_DE_LA_UBICACION = CODIGO_DE_LA_UBICACION;
        this.CANTIDAD_DE_FACTOR_DE_CONVERSION = CANTIDAD_DE_FACTOR_DE_CONVERSION;
        this.OPERADOR_DE_FACTOR_DE_CONVERSION = OPERADOR_DE_FACTOR_DE_CONVERSION;
        this.VALOR_DEL_FACTOR_DE_CONVERSION = VALOR_DEL_FACTOR_DE_CONVERSION;
        this.CLASIFICACION_1 = CLASIFICACION_1;
        this.CLASIFICACION_2 = CLASIFICACION_2;
        this.GRUPO_ACTIVOS = GRUPO_ACTIVOS;
        this.CODIGO_ACTIVO = CODIGO_ACTIVO;
        this.ADICION_O_MEJORA = ADICION_O_MEJORA;
        this.VECES_ADICIONALES_A_DEPRECIAR_POR_ADICION_O_MEJORA = VECES_ADICIONALES_A_DEPRECIAR_POR_ADICION_O_MEJORA;
        this.VECES_A_DEPRECIAR_NIIF = VECES_A_DEPRECIAR_NIIF;
        this.NUMERO_DEL_DOCUMENTO_DEL_PROVEEDOR = NUMERO_DEL_DOCUMENTO_DEL_PROVEEDOR;
        this.PREFIJO_DEL_DOCUMENTO_DEL_PROVEEDOR = PREFIJO_DEL_DOCUMENTO_DEL_PROVEEDOR;
        this.ANIO_DOCUMENTO_DEL_PROVEEDOR = ANIO_DOCUMENTO_DEL_PROVEEDOR;
        this.MES_DOCUMENTO_DEL_PROVEEDOR = MES_DOCUMENTO_DEL_PROVEEDOR;
        this.DIA_DOCUMENTO_DEL_PROVEEDOR = DIA_DOCUMENTO_DEL_PROVEEDOR;
        this.TIPO_DOCUMENTO_DE_PEDIDO = TIPO_DOCUMENTO_DE_PEDIDO;
        this.CODIGO_COMPROBANTE_DE_PEDIDO = CODIGO_COMPROBANTE_DE_PEDIDO;
        this.NUMERO_DE_COMPROBANTE_PEDIDO = NUMERO_DE_COMPROBANTE_PEDIDO;
        this.SECUENCIA_DE_PEDIDO = SECUENCIA_DE_PEDIDO;
        this.TIPO_DE_MONEDA_ELABORACION = TIPO_DE_MONEDA_ELABORACION;
        this.TIPO_Y_COMPROBANTE_CRUCE = TIPO_Y_COMPROBANTE_CRUCE;
        this.NUMERO_DE_DOCUMENTO_CRUCE = NUMERO_DE_DOCUMENTO_CRUCE;
        this.NUMERO_DE_VENCIMIENTO = NUMERO_DE_VENCIMIENTO;
        this.ANIO_VENCIMIENTO_DE_DOCUMENTO_CRUCE = ANIO_VENCIMIENTO_DE_DOCUMENTO_CRUCE;
        this.MES_VENCIMIENTO_DE_DOCUMENTO_CRUCE = MES_VENCIMIENTO_DE_DOCUMENTO_CRUCE;
        this.DIA_VENCIMIENTO_DE_DOCUMENTO_CRUCE = DIA_VENCIMIENTO_DE_DOCUMENTO_CRUCE;
        this.NUMERO_DE_CAJA_ASOCIADA_AL_COMPROBANTE = NUMERO_DE_CAJA_ASOCIADA_AL_COMPROBANTE;
        this.DESCRIPCION_DE_COMENTARIOS = DESCRIPCION_DE_COMENTARIOS;
        this.DESCRIPCION_LARGA = DESCRIPCION_LARGA;
        this.INCONTERM = INCONTERM;
        this.DESCRIPCION_EXPORTACION = DESCRIPCION_EXPORTACION;
        this.MEDIO_DE_TRANSPORTE = MEDIO_DE_TRANSPORTE;
        this.PAIS_DE_ORIGEN = PAIS_DE_ORIGEN;
        this.CIUDAD_DE_ORIGEN = CIUDAD_DE_ORIGEN;
        this.PAIS_DESTINO = PAIS_DESTINO;
        this.CIUDAD_DESTINO = CIUDAD_DESTINO;
        this.PESO_NETO = PESO_NETO;
        this.PESO_BRUTO = PESO_BRUTO;
        this.UNIDAD_DE_MEDIDA_NETO = UNIDAD_DE_MEDIDA_NETO;
        this.UNIDAD_DE_MEDIDA_BRUTO = UNIDAD_DE_MEDIDA_BRUTO;
        this.CONCEPTO_FACTURACION_EN_BLOQUE = CONCEPTO_FACTURACION_EN_BLOQUE;
        this.DATOS_ESTABLEC_L_LOCAL_O_OFICINA = DATOS_ESTABLEC_L_LOCAL_O_OFICINA;
        this.NUMERO_ESTABLECIMIENTO = NUMERO_ESTABLECIMIENTO;
    }
}