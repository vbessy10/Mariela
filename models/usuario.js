var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var esquema = new mongoose.Schema({
    nombre:String,
    apellido:String,
    correo:String,
    usuario:String,
    contrasenia:String,
    fechaNacimiento:String,
    imagen:String, 
    tipoUsuario:mongoose.SchemaTypes.Mixed, 
    genero:String
});
/*
esquema.pre('save', (next)=>{
    const user = this;
    if(!user.isModified('contrasenia')) return next();

    bcrypt.genSalt(10).then(salt=>{
        bcrypt.hashSync(user.contrasenia, salt).then(hash=>{
            user.contrasenia = hash;
            next();
        }).catch(err => next(err));
    }).catch(err => next(err));
})*/

module.exports = mongoose.model('usuarios',esquema);
