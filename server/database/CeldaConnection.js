import { Celda, CeldaDinosaurio, Dinosaurio } from "../models/associations.js";

class CeldaConnection {
    getAll = async () => {
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

        return celdas.map(celda => ({
            id: celda.id,
            nivelPeligrosidad: celda.nivelPeligrosidadId,
            cantidadAlimento: celda.CantAlimento,
            averias: celda.Averias,
            nivelSeguridad: celda.NivelSeguridad,
            dinosaurios: celda.celdaDinosaurios.map(cd => cd.dinosaurio?.name)
        }));
    }
}

export { CeldaConnection }