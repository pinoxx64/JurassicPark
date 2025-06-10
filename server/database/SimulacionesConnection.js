import { Celda, CeldaDinosaurio, Dinosaurio } from "../models/associations.js"
import { io } from '../app/server.js'

class SimulacionesConnection {
    simularFuncionNormal = async (tiempo) => {

        let informes = [];

        for (let i = 0; i < tiempo; i++) {
            const celdas = await Celda.findAll({
                paranoid: false,
                include: [{
                    model: CeldaDinosaurio,
                    as: 'celdaDinosaurios',
                    include: [{
                        model: Dinosaurio,
                        as: 'dinosaurio'
                    }]
                }]
            });

            let informeIteracion = [];

            for (const celda of celdas) {
                const porcentaje = Math.random() * 0.1 + 0.05;
                const alimentoInicial = celda.CantAlimento;
                const nuevoAlimento = Math.max(0, Math.floor(alimentoInicial * (1 - porcentaje)));

                if (Math.random() < 0.2) {
                    celda.Averias += 1;
                }

                celda.CantAlimento = nuevoAlimento;
                await celda.save();

                let brecha = false;
                let dinoEscapado = null;
                if (
                    celda.CantAlimento < 30 &&
                    celda.Averias > 4 &&
                    celda.celdaDinosaurios.length > 0 &&
                    Math.random() < 0.2
                ) {
                    brecha = true;
                    const idx = Math.floor(Math.random() * celda.celdaDinosaurios.length);
                    dinoEscapado = celda.celdaDinosaurios[idx];

                    await CeldaDinosaurio.destroy({
                        where: {
                            celdaId: celda.id,
                            dinosaurioId: dinoEscapado.dinosaurioId
                        }
                    });

                    io.emit('brecha', {
                        celda: celda.id,
                        dinoEscapado: dinoEscapado.dinosaurio?.name
                    });
                }

                const celdaActualizada = await Celda.findByPk(celda.id, {
                    include: [{
                        model: CeldaDinosaurio,
                        as: 'celdaDinosaurios',
                        include: [{
                            model: Dinosaurio,
                            as: 'dinosaurio'
                        }]
                    }]
                });
                const nombresDinosaurios = celdaActualizada.celdaDinosaurios.map(cd => cd.dinosaurio?.name);

                informeIteracion.push({
                    celda: celda.id,
                    nivelPeligrosidad: celda.nivelPeligrosidadId,
                    cantidadAlimento: celda.CantAlimento,
                    averias: celda.Averias,
                    nivelSeguridad: celda.NivelSeguridad,
                    dinosaurios: nombresDinosaurios,
                    brecha,
                    dinoEscapado: brecha && dinoEscapado ? dinoEscapado.dinosaurio?.name : null
                });
            }

            informes.push({
                iteracion: i + 1,
                informe: informeIteracion
            });
        }

        return informes;
    }

    simularFuncionBrecha = async (celdaId) => {
        let celda;
        if (celdaId) {
            celda = await Celda.findByPk(celdaId, {
                include: [{
                    model: CeldaDinosaurio,
                    as: 'celdaDinosaurios',
                    include: [{
                        model: Dinosaurio,
                        as: 'dinosaurio'
                    }]
                }]
            });
        } else {
            const celdas = await Celda.findAll({
                include: [{
                    model: CeldaDinosaurio,
                    as: 'celdaDinosaurios',
                    include: [{
                        model: Dinosaurio,
                        as: 'dinosaurio'
                    }]
                }]
            });
            celda = celdas[Math.floor(Math.random() * celdas.length)];
        }

        if (!celda) throw new Error("Celda no encontrada");

        const nivelSeguridad = celda.NivelSeguridad;
        const averias = celda.Averias;
        const dinosaurios = celda.celdaDinosaurios.map(cd => cd.dinosaurio);
        const cantidadPeligrosos = dinosaurios.filter(d => d.nivelPeligrosidadId >= 4).length;

        let probabilidadFuga = 0.1;
        if (nivelSeguridad <= 2) probabilidadFuga += 0.4;
        else if (nivelSeguridad <= 4) probabilidadFuga += 0.2;
        if (averias > 0) probabilidadFuga += 0.2 * averias;
        if (cantidadPeligrosos > 0) probabilidadFuga += 0.15 * cantidadPeligrosos;

        let probabilidadFugaPorcentaje = Math.min(probabilidadFuga * 100, 100).toFixed(0) + '%';

        const hayFuga = Math.random() < probabilidadFuga;

        let efectos = [];
        if (hayFuga) {
            efectos.push("¡Fuga! Los dinosaurios han escapado.");
            const carnivorosPeligrosos = dinosaurios.filter(d => d.nivelPeligrosidadId >= 4 && d.alimentacionId === 1);
            if (carnivorosPeligrosos.length > 0) {
                efectos.push("Dinosaurios carnívoros peligrosos han atacado a otros dinosaurios o personal.");
            }
            if (celda.CantAlimento < 20) {
                efectos.push("Por falta de comida, los dinosaurios se han vuelto más agresivos.");
            }
        } else {
            efectos.push("La brecha se contiene con éxito. No hay fuga.");
        }

        return {
            celda: celda.id,
            nivelPeligrosidad: celda.nivelPeligrosidadId,
            cantidadAlimento: celda.CantAlimento,
            averias: celda.Averias,
            nivelSeguridad: celda.NivelSeguridad,
            dinosaurios: dinosaurios.map(d => d.name),
            efectos,
            probabilidadFuga: probabilidadFugaPorcentaje,
            fuga: hayFuga
        };
    }
}

export { SimulacionesConnection }