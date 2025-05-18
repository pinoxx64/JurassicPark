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
                // Bajar la cantidad de alimento (15-5%)
                const porcentaje = Math.random() * 0.1 + 0.05;
                const alimentoInicial = celda.CantAlimento;
                const nuevoAlimento = Math.max(0, Math.floor(alimentoInicial * (1 - porcentaje)));

                // Generar avería aleatoria (20% probabilidad)
                if (Math.random() < 0.2) {
                    celda.Averias += 1;
                }

                // Guardar cambios
                celda.CantAlimento = nuevoAlimento;
                await celda.save();

                informeIteracion.push({
                    celdaId: celda.id,
                    alimentoInicial,
                    alimentoFinal: nuevoAlimento,
                    averias: celda.Averias,
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