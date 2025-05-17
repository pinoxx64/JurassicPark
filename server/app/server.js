import express from 'express'
import cors from 'cors'
import { createServer } from 'http'

import { router as UserRoutes } from '../routes/UserRoutes.js'
import { router as SimulacionesRoutes } from '../routes/SimulacionesRoutes.js'

class Server {

    constructor(){
        this.app = express()
        this.serverExpress = createServer(this.app)
    
        this.usersPath = '/api/user'
        this.simulacionPath = '/api/simulacion'

        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes(){
        this.app.use(this.usersPath, UserRoutes)
        this.app.use(this.simulacionPath, SimulacionesRoutes)
    }

    listen() {
        this.serverExpress.listen(process.env.PORT, () => {
            console.log(`Express server listening on: ${process.env.PORT}`)
        })
    }
}

export default Server