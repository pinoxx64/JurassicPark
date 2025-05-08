const bycrypt = require('bcrypt')
const { faker, fakerES } = require('@faker-js/faker')
const { roles } = require('./RolFactory.cjs')

const usuarios = async () => {
    const users = []
    for (let i = 0; i < 10; i++) {
        const password = await bycrypt.hash('password', 10)
        if (i == 0){
            users.push({
                name: fakerES.person.firstName(),
                email: fakerES.internet.email(),
                password: password,
                image: fakerES.image.avatar(),
                roles: ['Administrador']
            });
        }else if (i == 1){
            users.push({
                name: fakerES.person.firstName(),
                email: fakerES.internet.email(),
                password: password,
                image: fakerES.image.avatar(),
                roles: ['Veterinario']
            });
        }else if (i == 2){
            users.push({
                name: fakerES.person.firstName(),
                email: fakerES.internet.email(),
                password: password,
                image: fakerES.image.avatar(),
                roles: ['Mantenimiento']
            });
        }else{
            users.push({
                name: fakerES.person.firstName(),
                email: fakerES.internet.email(),
                password: password,
                image: fakerES.image.avatar()
            });
        }
    }

    return users
}

module.exports = {
    usuarios
}