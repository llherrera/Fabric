import {describe, expect, it, beforeAll} from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import path from 'path';
import fs from 'fs';

const rootFile = `${__dirname}/../uploads/`;

describe('POST data to generate Siigo formats', () => {
    const equivalentInsRoot = path.join(rootFile, 'Ejemplo_cargue_insumos.xlsx');
    const equivalentTelRoot = path.join(rootFile, 'Ejemplo_cargue_telas.xlsx');
    const equivalentTalRoot = path.join(rootFile, 'Ejemplo_cargue_tallas.xlsx');
    const equivalentProRoot = path.join(rootFile, 'Ejemplo_cargue_procesos.xlsx');
    beforeAll(() => {
        if (!fs.existsSync(equivalentInsRoot)) {
            throw new Error(`File not found: ${equivalentInsRoot}`);
        }
        if (!fs.existsSync(equivalentTelRoot)) {
            throw new Error(`File not found: ${equivalentTelRoot}`);
        }
        if (!fs.existsSync(equivalentTalRoot)) {
            throw new Error(`File not found: ${equivalentTalRoot}`);
        }
        if (!fs.existsSync(equivalentProRoot)) {
            throw new Error(`File not found: ${equivalentProRoot}`);
        }
    });

    describe("POST data 'Insumos' data to Siigo O1 format", () => {
        it('should response with a 204 status code', async () => {
            const response = await request(app)
                .post('/orden/insumos')
                .attach('file', equivalentInsRoot);
            expect(response.statusCode).toBe(204);
        });

        //it("should response with a 400 status code with message 'Error uploading file Invalid file type'", async () => {
        //    const response = await request(app)
        //        .post('/orden/insumos')
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
                .post('/orden/insumos')
                .send();
            expect(response.statusCode).toBe(500);
            expect(response.body.msg).toMatch("Cannot read properties of undefined (reading 'path')");
        });
    });

    describe("POST data 'Telas' data to Siigo O1 format", () => {
        it('should response with a 204 status code', async () => {
            const response = await request(app)
                .post('/orden/telas')
                .attach('file', equivalentTelRoot);
            expect(response.statusCode).toBe(204);
        });
    });

    describe("POST data 'Tallas' data to Siigo O1 format", () => {
        it('should response with a 204 status code', async () => {
            const response = await request(app)
                .post('/orden/tallas')
                .attach('file', equivalentTalRoot);
            expect(response.statusCode).toBe(204);
        });
    });

    describe("POST data 'Process' data to Siigo O2 format", () => {
        it('should response with a 204 status code', async () => {
            const response = await request(app)
                .post('/orden/procesos')
                .attach('file', equivalentProRoot);
            expect(response.statusCode).toBe(204);
        });
    });
});

describe("GET Siigo formats", () => {
    describe("GET Siigo O1 format", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .get('/orden/O1')
                .query({})
                .responseType('blob')
                .send();
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(response.body).toBeInstanceOf(Buffer);
        });
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .get('/orden/O1')
                .query({
                    ops: '19975,19976'
                })
                .responseType('blob')
                .send();
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(response.body).toBeInstanceOf(Buffer);
        });
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .get('/orden/O1')
                .query({
                    docNumber: '6',
                })
                .responseType('blob')
                .send();
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(response.body).toBeInstanceOf(Buffer);
        });
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .get('/orden/O1')
                .query({
                    ops: '19975,19976',
                    docNumber: '7',
                })
                .responseType('blob')
                .send();
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(response.body).toBeInstanceOf(Buffer);
        });
    });

    describe("GET Siigo O2 format", () => {
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .get('/orden/O2')
                .query({})
                .responseType('blob')
                .send();
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(response.body).toBeInstanceOf(Buffer);
        }, 10*1000);
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .get('/orden/O2')
                .query({
                    ops: '19975,19976'
                })
                .responseType('blob')
                .send();
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(response.body).toBeInstanceOf(Buffer);
        }, 10*1000);
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .get('/orden/O2')
                .query({
                    docNumber: '7',
                })
                .responseType('blob')
                .send();
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(response.body).toBeInstanceOf(Buffer);
        }, 10*1000);
        it('should response with a 200 status code', async () => {
            const response = await request(app)
                .get('/orden/O2')
                .query({
                    ops: '19975,19976',
                    docNumber: '8',
                })
                .responseType('blob')
                .send();
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(response.body).toBeInstanceOf(Buffer);
        }, 10*1000);
    });
});
