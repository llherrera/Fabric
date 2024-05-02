export interface SiigoFormat1 {
    TIPO_DE_COMPROBANTE_OBLIGATORIO: string;                    // len 1 
    CÓDIGO_COMPROBANTE_OBLIGATORIO: number;                     // len 3
    NÚMERO_DE_DOCUMENTO: number;                                // len 11
    CUENTA_CONTABLE_OBLIGATORIO: number;                        // len 10
    DÉBITO_O_CRÉDITO_OBLIGATORIO: string;                       // len 1
    VALOR_DE_LA_SECUENCIA_OBLIGATORIO: number;                  // len 13 y 2 decimales
    AÑO_DEL_DOCUMENTO: number;                                  // len 4
    MES_DEL_DOCUMENTO: number;                                  // len 2
    DÍA_DEL_DOCUMENTO: number;                                  // len 2
    CÓDIGO_DEL_VENDEDOR: number;                                // len 4
    CÓDIGO_DE_LA_CIUDAD: number;                                // len 4
    CÓDIGO_DE_LA_ZONA: number;                                  // len 3
    SECUENCIA: number;                                          // len 5
    CENTRO_DE_COSTO: number;                                    // len 4
    SUBCENTRO_DE_COSTO: number;                                 // len 3
    NIT: number;                                                // len 13 (sin digito de verificacion)
    SUCURSAL: number;                                           // len 3
    DESCRIPCIÓN_DE_LA_SECUENCIA: string;                        // len 50
    NÚMERO_DE_CHEQUE: number;                                   // len 11 (solo se usa para egresos, en los demas docs debe ir 0)
    COMPROBANTE_ANULADO: string;                                // len 1
    CÓDIGO_DEL_MOTIVO_DE_DEVOLUCIÓN: number;                    // len 4
    FORMA_DE_PAGO: number;                                      // len 4
    VALOR_DEL_CARGO_1_DE_LA_SECUENCIA: number;                  // len 13 y 2 decimales
    VALOR_DEL_CARGO_2_DE_LA_SECUENCIA: number;                  // len 13 y 2 decimales
    VALOR_DEL_DESCUENTO_1_DE_LA_SECUENCIA: number;              // len 13 y 2 decimales
    VALOR_DEL_DESCUENTO_2_DE_LA_SECUENCIA: number;              // len 13 y 2 decimales
    VALOR_DEL_DESCUENTO_3_DE_LA_SECUENCIA: number;              // len 13 y 2 decimales
    FACTURA_ELECTRÓNICA_A_DEBITAR_ACREDITAR: string;            // len 5 (una letra y 3 numeros separada por -)
    NÚMERO_DE_FACTURA_ELECTRÓNICA_A_DEBITAR_ACREDITAR: number;  // len 11
    PREFIJO_DE_ORDER_REFERENCE: string;                         // len 10 (digitar dato solo en la primera secuencia del documento)
    CONSECUTIVO_DE_ORDER_REFERENCE: string;                     // len 40 (digitar dato solo en la primera secuencia del documento)
    PREFIJO_ORDEN_DE_ENTREGA: string;                           // len 10 (digitar dato solo en la primera secuencia del documento)
    NUMERO_ORDEN_DE_ENTREGA: string;                            // len 40 (digitar dato solo en la primera secuencia del documento)
    AÑO_FECHA_DE_ORDEN_DE_ENTREGA: number;                      // len 4
    MES_FECHA_DE_ORDEN_DE_ENTREGA: number;                      // len 2
    DÍA_FECHA_DE_ORDEN_DE_ENTREGA: number;                      // len 2
    INGRESOS_PARA_TERCEROS: string;                             // len 1 (solo T de tercero)
    FECHA_ACTUALIZACIÓN_DEL_DOCUMENTO: number;                  // len 8
    HORA_DE_ACTUALIZACIÓN_DEL_DOCUMENTO: number;                // len 6
    PREFIJO_ORDEN_DE_ENTREGA2: string;                          // len 10 (digitar dato solo en la primera secuencia del documento)
    NUMERO_ORDEN_DE_ENTREGA2: string;                           // len 40 (digitar dato solo en la primera secuencia del documento)
    AÑO_FECHA_DE_ORDEN_DE_ENTREGA2: number;                     // len 4
    MES_FECHA_DE_ORDEN_DE_ENTREGA2: number;                     // len 2
    DÍA_FECHA_DE_ORDEN_DE_ENTREGA2: number;                     // len 2
    PREFIJO_ORDEN_DE_ENTREGA3: string;                          // len 10 (digitar dato solo en la primera secuencia del documento)
    NUMERO_ORDEN_DE_ENTREGA3: string;                           // len 40 (digitar dato solo en la primera secuencia del documento)
    AÑO_FECHA_DE_ORDEN_DE_ENTREGA3: number;                     // len 4
    MES_FECHA_DE_ORDEN_DE_ENTREGA3: number;                     // len 2
    DÍA_FECHA_DE_ORDEN_DE_ENTREGA3: number;                     // len 2
    PREFIJO_ORDEN_DE_ENTREGA4: string;                          // len 10 (digitar dato solo en la primera secuencia del documento)
    NUMERO_ORDEN_DE_ENTREGA4: string;                           // len 40 (digitar dato solo en la primera secuencia del documento)
    AÑO_FECHA_DE_ORDEN_DE_ENTREGA4: number;                     // len 4
    MES_FECHA_DE_ORDEN_DE_ENTREGA4: number;                     // len 2
    DÍA_FECHA_DE_ORDEN_DE_ENTREGA4: number;                     // len 2
    PREFIJO_ORDEN_DE_ENTREGA5: string;                          // len 10 (digitar dato solo en la primera secuencia del documento)
    NUMERO_ORDEN_DE_ENTREGA5: string;                           // len 40 (digitar dato solo en la primera secuencia del documento)
    AÑO_FECHA_DE_ORDEN_DE_ENTREGA5: number;                     // len 4
    MES_FECHA_DE_ORDEN_DE_ENTREGA5: number;                     // len 2
    DÍA_FECHA_DE_ORDEN_DE_ENTREGA5: number;                     // len 2
    PORCENTAJE_ALIMENTOS_ULTRAPROCESADOS: number;               // len 3 y 3 decimales
    VALOR_ALIMENTOS_ULTRAPROCESADOS: number;                    // len 13 y 3 decimales
    VALOR_BEBIDAS_AZUCARADAS: number;                           // len 13 y 3 decimales
    PORCENTAJE_DEL_IVA_DE_LA_SECUENCIA: number;                 // len 3 y 2 decimales
    VALOR_DE_IVA_DE_LA_SECUENCIA: number;                       // len 11 y 2 decimales
    BASE_DE_RETENCIÓN: number;                                  // len 13 y 5 decimales
    BASE_PARA_CUENTAS_MARCADAS_COMO_RETEIVA: number;            // len 13 y 2 decimales
    SECUENCIA_GRAVADA_O_EXCENTA: string;                        // len 1
    PORCENTAJE_AIU: number;                                     // len 5 y 5 decimales
    BASE_IVA_AIU: number;                                       // len 13 y 2 decimales
    VALOR_TOTAL_IMPOCONSUMO_DE_LA_SECUENCIA: number;            // len 11 y 5 decimales
    LÍNEA_PRODUCTO: number;                                     // len 3
    GRUPO_PRODUCTO: number;                                     // len 4
    CÓDIGO_PRODUCTO: number;                                    // len 6
    CANTIDAD: number;                                           // len 13 y 5 decimales
    CANTIDAD_DOS: number;                                       // len 13 y 5 decimales
    CÓDIGO_DE_LA_BODEGA: number;                                // len 4
    CÓDIGO_DE_LA_UBICACIÓN: number;                             // len 3
    CANTIDAD_DE_FACTOR_DE_CONVERSIÓN: number;                   // len 13 y 5 decimales
    OPERADOR_DE_FACTOR_DE_CONVERSIÓN: number;                   // len 1 (del 1 al 5)
    VALOR_DEL_FACTOR_DE_CONVERSIÓN: number;                     // len 5 y 5 decimales
    CLASIFICACIÓN_1: string;                                    // len 10
    CLASIFICACIÓN_2: string;                                    // len 8
    GRUPO_ACTIVOS: number;                                      // len 4
    CÓDIGO_ACTIVO: number;                                      // len 5
    ADICIÓN_O_MEJORA: string;                                   // len 1 (A o vacio)
    VECES_ADICIONALES_A_DEPRECIAR_POR_ADICIÓN_O_MEJORA: number; // len 3 (aplica solo a registros marcados como adicion o mejora, sino se deja en blanco)
    VECES_A_DEPRECIAR_NIIF: number;                             // len 3
    NÚMERO_DEL_DOCUMENTO_DEL_PROVEEDOR: number;                 // len 11
    PREFIJO_DEL_DOCUMENTO_DEL_PROVEEDOR: string;                // len 10
    AÑO_DOCUMENTO_DEL_PROVEEDOR: number;                        // len 4
    MES_DOCUMENTO_DEL_PROVEEDOR: number;                        // len 2
    DÍA_DOCUMENTO_DEL_PROVEEDOR: number;                        // len 2
    TIPO_DOCUMENTO_DE_PEDIDO: string;                           // len 1
    CÓDIGO_COMPROBANTE_DE_PEDIDO: number;                       // len 3
    NÚMERO_DE_COMPROBANTE_PEDIDO: number;                       // len 11
    SECUENCIA_DE_PEDIDO: number;                                // len 3 (maximo 250)
    TIPO_DE_MONEDA_ELABORACIÓN: number;                         // len 2 (aplica para definir la moneda con la cual se elabiri el documento)
    TIPO_Y_COMPROBANTE_CRUCE: string;                           // len 5 (una letra y 3 numeros separada por -)
    NÚMERO_DE_DOCUMENTO_CRUCE: number;                          // len 11
    NÚMERO_DE_VENCIMIENTO: number;                              // len 3 (maximo 250)
    AÑO_VENCIMIENTO_DE_DOCUMENTO_CRUCE: number;                 // len 4
    MES_VENCIMIENTO_DE_DOCUMENTO_CRUCE: number;                 // len 2
    DÍA_VENCIMIENTO_DE_DOCUMENTO_CRUCE: number;                 // len 2
    NÚMERO_DE_CAJA_ASOCIADA_AL_COMPROBANTE: number;             // len 3
    DESCRIPCIÓN_DE_COMENTARIOS: string;                         // len 228
    DESCRIPCIÓN_LARGA: string;                                  // len 3000
    INCONTERM: string;                                          // len 10 (condicion de entrega: Factura de exportacion)
    DESCRIPCIÓN_EXPORTACIÓN: string;                            // len 50
    MEDIO_DE_TRANSPORTE: string;                                // len 50
    PAÍS_DE_ORIGEN: number;                                     // len 3
    CIUDAD_DE_ORIGEN: number;                                   // len 4
    PAIS_DESTINO: number;                                       // len 3
    CIUDAD_DESTINO: number;                                     // len 4
    PESO_NETO: number;                                          // len 10 y 3 decimales
    PESO_BRUTO: number;                                         // len 10 y 3 decimales
    UNIDAD_DE_MEDIDA_NETO: string;                              // len 10
    UNIDAD_DE_MEDIDA_BRUTO: string;                             // len 10
    CONCEPTO_FACTURACION_EN_BLOQUE: number;                     // len 4
    DATOS_ESTABLEC_L_LOCAL_O_OFICINA: string;                   // len 1 (L o O)
    NÚMERO_ESTABLECIMIENTO: number;                             // len 10
}