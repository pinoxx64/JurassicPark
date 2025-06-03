import { User, UserRol, Rol } from '../models/associations.js'
import bycrypt from 'bcrypt'
import { Op, where } from 'sequelize'


class UserConnection {
    getUsers = async () => {
        let users = []

        users = await User.findAll({
            paranoid: false,
            include: [{
                model: UserRol,
                as: 'roles',
                include: {
                    model: Rol,
                    as: 'rol'
                }
            }]
        })

        if (!users) throw new Error("No hay usuarios")

        users = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            deletedAt: user.deletedAt,
            roles: user.roles.map(rol => rol.rol.name)
        }))

        return users
    }

    getUserById = async (id) => {

        let user = []
        user = await User.findOne({
            where: { id },
            include: [{
                model: UserRol,
                as: 'roles',
                include: {
                    model: Rol,
                    as: 'rol'
                }
            }]
        })

        if (!user) throw new Error("No existe el usuario")

        user = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            deletedAt: user.deletedAt,
            roles: user.roles.map(rol => rol.rol.name)
        }

        return user
    }

    getUserByEmail = async (email) => {
        let user = []

        user = await User.findOne({
            where: {
                email: email
            },
            include: [{
                model: UserRol,
                as: 'roles',
                include: {
                    model: Rol,
                    as: 'rol'
                }
            }]
        })

        if (!user) throw new Error("No existe el usuario")

        user = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            deletedAt: user.deletedAt,
            roles: user.roles.map(rol => rol.rol.name)
        }

        return user
    }

    login = async (email, password) => {
        let user = []
        console.log(email, password)

        user = await User.findOne({
            where: {
                email: email
            },
            include: [{
                model: UserRol,
                as: 'roles',
                include: {
                    model: Rol,
                    as: 'rol'
                }
            }]
        })
        console.log(user.password)

        if (!user) throw new Error("No existe el usuario")

        const correctPassword = await bycrypt.compare(password, user.password)
        console.log(correctPassword)

        if (!correctPassword) throw new Error("Contraseña incorrecta")

        user = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            deletedAt: user.deletedAt,
            roles: user.roles.map(rol => rol.rol.name)
        }
        console.log(user)
        return user
    }

    postUser = async (body) => {
        const { name, email, password, image, roles } = body

        const user = await User.create({
            name,
            email,
            password,
            image
        })

        if (roles && roles.length > 0) {
            for (const rolName of roles) {
                const rol = await Rol.findOne({ where: { name: rolName } });
                if (rol) {
                    await UserRol.create({
                        userId: user.id,
                        rolId: rol.id,
                    });
                }
            }
        }

        const userCreado = await User.findByPk(user.id, {
            include: [{
                model: UserRol,
                as: 'roles',
                include: {
                    model: Rol,
                    as: 'rol'
                }
            }]
        })

        return {
            id: userCreado.id,
            name: userCreado.name,
            email: userCreado.email,
            image: userCreado.image,
            deletedAt: userCreado.deletedAt,
            roles: userCreado.roles.map(rol => rol.rol.name)
        }
    }

putUser = async (id, body) => {
    await User.update({
        name: body.name,
        email: body.email,
        image: body.image,
        password: body.password
    }, {
        where: { id }
    });

    if (body.roles && Array.isArray(body.roles)) {
        await UserRol.destroy({ where: { userId: id } });

        for (const rolName of body.roles) {
            const rol = await Rol.findOne({ where: { name: rolName } });
            if (rol) {
                await UserRol.create({
                    userId: id,
                    rolId: rol.id,
                });
            }
        }
    }

    const userActualizado = await User.findByPk(id, {
        include: [{
            model: UserRol,
            as: 'roles',
            include: {
                model: Rol,
                as: 'rol'
            }
        }]
    });

    console.log(userActualizado)
    if (!userActualizado) throw new Error('No se ha podido modificar el usuario.');

    return {
        id: userActualizado.id,
        name: userActualizado.name,
        email: userActualizado.email,
        image: userActualizado.image,
        deletedAt: userActualizado.deletedAt,
        roles: userActualizado.roles.map(rol => rol.rol.name)
    };
}

    softDeleteUser = async (id) => {
        try {
            const user = await User.findByPk(id, { paranoid: false });

            if (!user) {
                throw new Error(`No se ha encontrado el usuario con el ID proporcionado. (${id})`);
            }

            if (user.deletedAt) {
                throw new Error(`El usuario con ID ${id} ya está eliminado.`);
            }

            await user.destroy();

            return { message: `Usuario con ID ${id} ha sido marcado como eliminado (soft delete).` };
        } catch (error) {
            throw new Error(`Error al realizar el soft delete: ${error.message}`);
        }
    }

    reactivateUser = async (id) => {
        try {
            const user = await User.findByPk(id, {
                paranoid: false,
            });

            if (!user) {
                throw new Error(`No se ha encontrado el usuario con el ID proporcionado. (${id})`);
            }

            if (user.deletedAt === null) {
                throw new Error(`El usuario con ID ${id} ya está activo.`);
            }

            await user.restore();

            return { message: `Usuario con ID ${id} ha sido reactivado exitosamente.` };
        } catch (error) {
            throw new Error(`Error al reactivar el usuario: ${error.message}`);
        }
    }
}

export { UserConnection }