export const regParentesis = /^(.*)\((.*)\)$/;
export const regReferencia = /^\d+(?:\s*-\s*\d+)*\b/;

export const Path = {
    Base:       '/',
    Load:       '/cargar',
    Order:      '/orden',
    Codes:      '/codigos',
    Catalogue:  '/catalogo',
    SiigoIns:   '/insumos-siigo',
    SiigoTel:   '/telas-siigo',
    SiigoPro:   '/productos-siigo',
    LiderIns:   '/insumos-lider',
    LiderTel:   '/telas-lider',
    LiderPro:   '/productos-lider',
    LiderSer:   '/servicios-lider',
    Tallas:     '/tallas',
    Colors:     '/colores',
    Bodega:     '/bodegas',
    Process:    '/procesos',
    Clients:    '/clientes',
    Equivalent: '/equivalencias',
    Insumos:    '/insumos',
    Telas:      '/telas',
    O1:         '/O1',
    O2:         '/O2',
}

export const FILES_NAME = {
    Bodegas:    'bodegas',
    Colores:    'colores',
    Tallas:     'tallas',
    Procesos:   'procesos',
    Clientes:   'clientes',

    dataFormat1: 'dataFormatO1',
    dataFormat2: 'dataFormatO2',

    LiderProds: 'productos_lider',
    SiigoProds: 'productos_siigo',
    LiderTelas: 'telas_lider',
    SiigoTelas: 'telas_siigo',
    LiderInsum: 'insumos_lider',
    SiigoInsum: 'insumos_siigo',
    LiderServi: 'servicios_lider',

    CodesNameInsum: 'Códigos Insumos',
    CodesNameTelas: 'Códigos Telas',
    CodesNameProds: 'Códigos Terminados',
    CodesNameTalla: 'Códigos Tallas',
    CodesNamecolor: 'Códigos Colores',
    CodesNameBodeg: 'Códigos Bodegas',
    CodesNameProce: 'Códigos Procesos',
    CodesNameClien: 'Códigos Clientes',
    CodesNameServi: 'Códigos Servicios',

    CreditosInsumos:     'productosInsumos',
    CreditosTelas:       'productosTelas',
    CreditosTerminados:  'productosTerminados',
    CreditosTallas:      'productosTallas',

    CreditosProcesos:    'productosProcesos',
}