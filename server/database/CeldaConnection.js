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

        if (body.dinosaurios) {
            const celda = await Celda.findByPk(id, {
                include: [{
                    model: CeldaDinosaurio,
                    as: 'celdaDinosaurios'
                }]
            });

            await CeldaDinosaurio.destroy({ where: { celdaId: id } });

            const dinos = await Dinosaurio.findAll({
                where: { name: body.dinosaurios }
            });

            for (const dino of dinos) {
                await CeldaDinosaurio.create({
                    celdaId: id,
                    dinosaurioId: dino.id
                });
            }
        }

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

    getDinosDiponibles = async () => {
        const dinos = await Dinosaurio.findAll({
            include: [
                {
                    model: CeldaDinosaurio,
                    as: 'celdaDinosaurios',
                    required: false
                },
                {
                    association: 'razaSaurio',
                    attributes: ['name']
                },
                {
                    association: 'nivelPeligrosidad',
                    attributes: ['name']
                },
                {
                    association: 'alimentacion',
                    attributes: ['name']
                }
            ]
        });

        const disponibles = dinos.filter(d => !d.celdaDinosaurios || d.celdaDinosaurios.length === 0);

        return disponibles.map(d => ({
            id: d.id,
            name: d.name,
            raza: d.razaSaurio?.name ?? null,
            nivelPeligrosidad: d.nivelPeligrosidad?.name ?? null,
            alimentacion: d.alimentacion?.name ?? null
        }));
    }
}

export { CeldaConnection }