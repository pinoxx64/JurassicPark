const nivelPeligrosidad = async() => {
    const nivelPeligrosidad = []

    nivelPeligrosidad.push({
        name: '🟢Bajo'
    })

    nivelPeligrosidad.push({
        name: '⚠Medio'
    })

    nivelPeligrosidad.push({
        name: '🔴Alto'
    })

    nivelPeligrosidad.push({
        name: '🚨Muy Alto'
    })

    nivelPeligrosidad.push({
        name: '☠Extremo'
    })

    nivelPeligrosidad.push({
        name: '☠☠Crítico'
    })

    return nivelPeligrosidad
}

module.exports = {
    nivelPeligrosidad
}