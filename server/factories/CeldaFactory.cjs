const celda = async() => {
    const cel = []
    
    for (let i = 1; i <= 6; i++) {
        cel.push({
            nivelPeligrosidadId: i,
            CantAlimento: 100,
            Averias: 0,
            NivelSeguridad: i
        })
    }

    return cel
}

module.exports = {
    celda
}