import { UserConnection } from "../database/UserConnection.js"

const conn = new UserConnection()

const UserController = {

    funGetUsers: (req, res) => {
        conn.getUsers()
            .then(users => {
                res.status(200).json({
                    status: 200,
                    message: "Usuarios obtenidos correctamente",
                    users: users
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funGetUser: (req, res) => {
        conn.getUserById(req.params.id)
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message: "Usuario obtenido correctamente",
                    user: user
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funGetUserByEmail: (req, res) => {
        conn.getUserByEmail(req.body.email)
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message: "Usuario obtenido correctamente",
                    user: user
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funLogin: (req, res) => {
        conn.login(req.body.email, req.body.password)
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message: "Usuario logueado correctamente",
                    user: user
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funPostUser: (req, res) => {
        conn.postUser(req.body)
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message: "Usuario creado correctamente",
                    user: user
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funPutUser: (req, res) => {
        conn.putUser(req.params.id, req.body)
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message: "Usuario actualizado correctamente",
                    user: user
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funDeleteUser: (req, res) => {
        conn.softDeleteUser(req.params.id)
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message: "Usuario eliminado correctamente",
                    user: user
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funActivateUser: (req, res) => {
        conn.reactivateUser(req.params.id)
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message: "Usuario reactivado correctamente",
                    user: user
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

export default UserController