const request = require('supertest');
const express = require('express');
const routes = require('../routes/UserRoutes');
const app = express();
app.use(express.json());
const appAuth = express();
appAuth.use(express.json());
app.use('/', routes);

DESCRIBE('Test users', () => {
    it('Obtener todos los usuarios', async () => {
        const response = await request(app).get('/')
        expect(response.status).toBe(200)
    })

    it('Obtener el usuario 1', async () => {
        const response = await request(app).get('/1')
        expect(response.status).toBe(200)
    })

    // it('Modificar usuario 1', async () => {
    //     const response = await request(app).put('/1')
    //     expect(response.status).toBe(200)
    // })

    it('Eliminar usuario 1', async () => {
        const response = await request(app).delete('/1')
        expect(response.status).toBe(200)
    })

    it('Activar usuario 1', async () => {
        const response = await request(app).get('/activate/1')
        expect(response.status).toBe(200)
    })
})