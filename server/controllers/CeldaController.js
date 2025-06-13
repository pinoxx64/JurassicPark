import { CeldaConnection } from '../database/CeldaConnection.js';

const conn = new CeldaConnection

const CeldaController = {
    getAll: (req, res) => {
        conn.getAll()
            .then(celdas => {
                res.status(200).json({
                    status: 200,
                    message: "Celdas obtenidas correctamente",
                    celdas: celdas
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funPutCelda: (req, res) => {
        conn.putCelda(req.params.id, req.body)
            .then(celda => {
                res.status(200).json({
                    status: 200,
                    message: "Celda actualizada",
                    celda: celda
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funDinosDisponibles: (req, res) => {
        conn.getDinosDiponibles()
            .then(dinos => {
                res.status(200).json({
                    status: 200,
                    message: "Dinosaurios disponibles obtenidos correctamente",
                    dinosaurios: dinos
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    }
}

export default CeldaController