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

    return rol
}

module.exports = {
    roles
}