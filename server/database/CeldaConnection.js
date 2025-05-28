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

    putCelda = async (id, body) => {
        const updateBody = {
            nivelPeligrosidadId: body.nivelPeligrosidad ?? body.nivelPeligrosidadId,
            CantAlimento: body.cantidadAlimento ?? body.CantAlimento,
            Averias: body.averias ?? body.Averias,
            NivelSeguridad: body.nivelSeguridad ?? body.NivelSeguridad
        };

        const [updatedRows] = await Celda.update(updateBody, {
            where: { id }
        });

        if (updatedRows === 0) throw new Error('No se ha podido modificar la celda');

        const celda = await Celda.findOne({
            where: { id },
            include: [{
                model: CeldaDinosaurio,
                as: 'celdaDinosaurios',
                include: [{
                    model: Dinosaurio,
                    as: 'dinosaurio'
                }]
            }]
        });

        if (!celda) throw new Error('No se ha encontrado la celda actualizada');

        return {
            id: celda.id,
            nivelPeligrosidad: celda.nivelPeligrosidadId,
            cantidadAlimento: celda.CantAlimento,
            averias: celda.Averias,
            nivelSeguridad: celda.NivelSeguridad,
            dinosaurios: celda.celdaDinosaurios.map(cd => cd.dinosaurio?.name)
        };
    }
}

export { CeldaConnection }