const { fakerES } = require('@faker-js/faker')

const dinosaurios = async () => {
    const dino = []
    for (let i = 1; i < 17; i++) {
        const raza = i
        let alimentacion = 0
        let nivelPeligrosidad = 0

        if (raza >= 7 && raza <= 9) {
            alimentacion = 1
        }else if (raza >= 10 && raza <= 17) {
            alimentacion = 2
        }

        if (raza == 1 || raza == 3 || raza == 4 || raza == 7 || raza == 8) {
            nivelPeligrosidad = 1
        }else if (raza == 9) {
            nivelPeligrosidad = 2
        }else if (raza >= 10 && raza <= 13) {
            nivelPeligrosidad = 3
        }else if (raza >= 14 && raza <= 16) {
            nivelPeligrosidad = 4
        }else{
            nivelPeligrosidad = 5
        }

        dino.push({
            name: fakerES.person.firstName(),
            razaId: raza,
            edad: fakerES.number.int({ min: 1, max: 50 }),
            nivelPeligrosidadId: nivelPeligrosidad,
            alimentacionId: alimentacion
        })
    }

    return dino
}

module.exports = {
    dinosaurios
}