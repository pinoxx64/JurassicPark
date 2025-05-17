import { Celda, CeldaDinosaurio} from "../models/associations.js"

class SimulacionesConnection {
    simularFuncionNormal = async(tiempo) => {


        let informes = [];

        for (let i = 0; i < tiempo; i++) {
            // Obtener todas las celdas con sus dinosaurios
            const celdas = await Celda.findAll({
                include: [{ model: CeldaDinosaurio, as: 'celdaDinosaurios' }]
            });

            let informeIteracion = [];

            for (const celda of celdas) {
                // Bajar la cantidad de alimento (10-30%)
                const porcentaje = Math.random() * 0.2 + 0.1;
                const alimentoInicial = celda.CantAlimento;
                const nuevoAlimento = Math.max(0, Math.floor(alimentoInicial * (1 - porcentaje)));

                // Generar avería aleatoria (20% probabilidad)
                const averiasInicial = celda.Averias;
                let averiasFinal = averiasInicial;
                if (Math.random() < 0.2) {
                    averiasFinal += 1;
                }

                // Guardar cambios
                celda.CantAlimento = nuevoAlimento;
                celda.Averias = averiasFinal;
                await celda.save();

                informeIteracion.push({
                    celdaId: celda.id,
                    alimentoInicial,
                    alimentoFinal: nuevoAlimento,
                    averiasInicial,
                    averiasFinal,
                    dinosaurios: celda.celdaDinosaurios.map(cd => cd.dinosaurioId)
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