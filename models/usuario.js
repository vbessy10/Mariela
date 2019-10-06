var mongoose = require('mongoose');

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

module.exports = mongoose.model('usuarios',esquema);
