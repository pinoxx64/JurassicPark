import User from "./user.js";
import Rol from "./rol.js";
import UserRol from "./userrol.js";
import RazaSaurio from "./razasaurio.js";
import nivelPeligrosidad from "./nivelpeligrosidad.js";
import alimentacion from "./alimentacion.js";
import Dinosaurio from "./dinosaurio.js";
import Celda from "./celda.js"
import CeldaDinosaurio from "./celdadinosaurio.js"

// Users
User.Rol = User.hasMany(UserRol, {as: 'roles', foreignKey: 'userId'})

// Roles
Rol.User = Rol.hasMany(UserRol, {as: 'users', foreignKey: 'rolId'})

// UserRols
UserRol.User = UserRol.belongsTo(User, {as: 'user', foreignKey: 'userId'})
UserRol.Rol = UserRol.belongsTo(Rol, {as: 'rol', foreignKey: 'rolId'})

// RazaSaurio
RazaSaurio.Dinosaurio = RazaSaurio.hasMany(Dinosaurio, {as: 'dinosaurios', foreignKey: 'razaId'})

// nivelPeligrosidad
nivelPeligrosidad.Dinosaurio = nivelPeligrosidad.hasMany(Dinosaurio, {as: 'dinosaurios', foreignKey: 'nivelPeligrosidadId'})
nivelPeligrosidad.Celda = nivelPeligrosidad.hasMany(Celda, {as: 'celdas', foreignKey: 'nivelPeligrosidadId'})

// alimentacion
alimentacion.Dinosaurio = alimentacion.hasMany(Dinosaurio, {as: 'dinosaurios', foreignKey: 'alimentacionId'})

// Dinosaurio
Dinosaurio.RazaSaurio = Dinosaurio.belongsTo(RazaSaurio, {as: 'razaSaurio', foreignKey: 'razaId'})
Dinosaurio.nivelPeligrosidad = Dinosaurio.belongsTo(nivelPeligrosidad, {as: 'nivelPeligrosidad', foreignKey: 'nivelPeligrosidadId'})
Dinosaurio.alimentacion = Dinosaurio.belongsTo(alimentacion, {as: 'alimentacion', foreignKey: 'alimentacionId'})

Dinosaurio.CeldaDinosaurio = Dinosaurio.hasMany(CeldaDinosaurio, {as: 'celdaDinosaurios', foreignKey: 'dinosaurioId'})
// Celda
Celda.CeldaDinosaurio = Celda.hasMany(CeldaDinosaurio, {as: 'celdaDinosaurios', foreignKey: 'celdaId'})

Celda.nivelPeligrosidad = Celda.belongsTo(nivelPeligrosidad, {as: 'nivelPeligrosidads', foreignKey: 'nivelPeligrosidadId'})

// CeldaDinosaurio
CeldaDinosaurio.Celda = CeldaDinosaurio.belongsTo(Celda, {as: 'celdas', foreignKey: 'celdaId'})
CeldaDinosaurio.Dinosaurio = CeldaDinosaurio.belongsTo(Dinosaurio, {as: 'dinosaurio', foreignKey: 'dinosaurioId'})

export {
    User,
    Rol,
    UserRol,
    RazaSaurio,
    nivelPeligrosidad,
    alimentacion,
    Dinosaurio,
    Celda,
    CeldaDinosaurio
}