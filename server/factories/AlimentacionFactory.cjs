const alimentacion = async() => {
    const alimentacion = []

    alimentacion.push({
        name: 'Carnivoro'
    })

    alimentacion.push({
        name: 'Herbivoro'
    })

    alimentacion.push({
        name: 'Omnivoro'
    })

    return alimentacion
}

module.exports = {
    alimentacion
}