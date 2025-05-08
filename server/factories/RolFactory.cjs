const roles = async() => {
    const rol = []

    rol.push({
        name: 'Administrador'
    })

    rol.push({
        name: 'Veterinario'
    })

    rol.push({
        name: 'Mantenimiento'
    })

    rol.push({
        name: 'Usuario'
    })

    return rol
}

module.exports = {
    roles
}