var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombre:String,
    descripcion:String
});

module.exports = mongoose.model('categorias',esquema);