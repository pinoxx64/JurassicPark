import { Celda, CeldaDinosaurio, Dinosaurio} from "../models/associations.js"

class SimulacionesConnection {
    simularFuncionNormal = async(tiempo) => {

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

                const nombresDinosaurios = celda.celdaDinosaurios.map(cd => cd.dinosaurio?.name);

                informeIteracion.push({
                    celda: celda.id,
                    nivelPeligrosidad: celda.nivelPeligrosidadId,
                    cantidadAlimento: celda.CantAlimento,
                    averias: celda.Averias,
                    nivelSeguridad: celda.NivelSeguridad,
                    dinosaurios: nombresDinosaurios
                });
            }

            informes.push({
                iteracion: i + 1,
                informe: informeIteracion
            });
        }

        return informes;
    }
}

export { SimulacionesConnection }