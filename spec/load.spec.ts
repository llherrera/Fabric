import {describe, expect, it, beforeAll} from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import path, { resolve } from 'path';
import fs from 'fs';

const rootFile = `${__dirname}/../uploads/`;
/*
describe('POST Uploads Siigo and Lider files routes', () => {
    const equivalentRoot = path.join(rootFile, 'Base_Tabla_Equivalencias.xlsx');
    const invalidRoot    = path.join(rootFile, 'Base_Tabla_Equivalencias.txt');
    beforeAll(() => {
        if (!fs.existsSync(equivalentRoot)) {
            throw new Error(`File not found: ${equivalentRoot}`);
        }
    });

    describe("POST Siigo 'Insumos' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/insumos-siigo')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de insumos de Siigo. Se ha actualizado la tabla de equivalencias.');
        });

        //it("should response with a 400 status code with message 'Error uploading file Invalid file type'", async () => {
        //    const response = await request(app)
        //        .post('/cargar/insumos-siigo')
        //        .attach('file', invalidRoot)
        //        .catch(err => {
        //            console.log(err);
        //            throw err;
        //        });
        //    expect(response.statusCode).toBe(400);
        //    expect(response.body.msg).toMatch('Error uploading file. Invalid file type');
        //});

        it("should response with a 500 status code with message 'Cannot read properties of undefined (reading 'path')'", async () => {
            const response = await request(app)
                .post('/cargar/insumos-siigo')
                .send();
            expect(response.statusCode).toBe(500);
            expect(response.body.msg).toMatch("Cannot read properties of undefined (reading 'path')");
        });
    });
    describe("POST Siigo 'Telas' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/telas-siigo')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de telas de Siigo. Se ha actualizado la tabla de equivalencias.');
        });
    });
    describe("POST Siigo 'Productos' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/productos-siigo')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de productos de Siigo. Se ha actualizado la tabla de equivalencias.');
        });
    });

    describe("POST Lider 'Insumos' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/insumos-lider')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de insumos de Lider. Se ha actualizado la tabla de equivalencias.');
        });
    });
    describe("POST Lider 'Telas' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/telas-lider')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de telas de Lider. Se ha actualizado la tabla de equivalencias.');
        });
    });
    describe("POST Lider 'Productos' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/productos-lider')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de productos de Lider. Se ha actualizado la tabla de equivalencias.');
        });
    });

    describe("POST Lider 'Servicios' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/servicios-lider')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de servicios de Lider. Se ha actualizado la tabla de equivalencias.');
        });
    });

});

describe("POST Uploads catalogue codes routes", () => {
    const equivalentRoot = path.join(rootFile, 'Catalogo_tallas_colores_talleres.xlsx');
    describe("POST Siigo 'Tallas' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/tallas')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de Tallas. Se ha actualizado la tabla de equivalencias.');
        });
    });
    describe("POST Siigo 'Colores' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/colores')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de Colores. Se ha actualizado la tabla de equivalencias.');
        });
    });
    describe("POST Siigo 'Bodegas' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/bodegas')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de Bodegas. Se ha actualizado la tabla de equivalencias.');
        });
    });
    describe("POST Siigo 'Procesos' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/procesos')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de Procesos. Se ha actualizado la tabla de equivalencias.');
        });
    });
    describe("POST Siigo 'Clientes' cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/clientes')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toMatch('Se ha creado el fichero de Clientes. Se ha actualizado la tabla de equivalencias.');
        });
    });
});

describe("Upload and download one file to generate Equivalent table", () => {
    let equivalentRoot = path.join(rootFile, 'Base_Tabla_Equivalencias.xlsx');
    let invalidRoot    = path.join(rootFile, 'Base_Tabla_Equivalencias.txt');
    describe("POST Siigo and Lider codes cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/codigos')
                .responseType('blob')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(response.body).toBeInstanceOf(Buffer);
        }, 10*1000);
    });

    equivalentRoot = path.join(rootFile, 'Catalogo_tallas_colores_talleres.xlsx');
    invalidRoot    = path.join(rootFile, 'Catalogo_tallas_colores_talleres.txt');
    describe("POST Siigo and Lider catalogue cases", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .post('/cargar/catalogo')
                .responseType('blob')
                .attach('file', equivalentRoot);
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(response.body).toBeInstanceOf(Buffer);
        });
    });

    describe("GET Equivalent table", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .get('/cargar/equivalencias')
                .responseType('blob')
                .send();
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(response.body).toBeInstanceOf(Buffer);
        });
    });

});
*/