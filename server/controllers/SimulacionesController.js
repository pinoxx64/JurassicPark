import { SimulacionesConnection } from "../database/SimulacionesConnection.js"

const conn = new SimulacionesConnection

const SimulacionesController = {
    funSimularFuncionNormal: (req, res) => {
        conn.simularFuncionNormal(req.body.tiempo)
            .then(informes => {
                res.status(200).json({
                    status: 200,
                    message: "Simulación realizada correctamente",
                    informes: informes
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },

    funSimularFuncionBrecha: (req, res) => {
        conn.simularFuncionBrecha(req.body.celdaId)
            .then(informes => {
                res.status(200).json({
                    status: 200,
                    message: "Simulación realizada correctamente",
                    informes: informes
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

export default SimulacionesController