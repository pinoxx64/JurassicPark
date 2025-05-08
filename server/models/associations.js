import User from "./user.js";
import Rol from "./rol.js";
import UserRol from "./userrol.js";

// Users
User.Rol = User.hasMany(UserRol, {as: 'roles', foreignKey: 'userId'})

// Roles
Rol.User = Rol.hasMany(UserRol, {as: 'users', foreignKey: 'rolId'})

// UserRols
UserRol.User = UserRol.belongsTo(User, {as: 'user', foreignKey: 'userId'})
UserRol.Rol = UserRol.belongsTo(Rol, {as: 'rol', foreignKey: 'rolId'})

export {
    User,
    Rol,
    UserRol
}