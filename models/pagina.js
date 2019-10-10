var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    titulo:String,
    favicon:String,
    logotipo:String,
    autor:mongoose.Types.ObjectId,
    descripcion:String,
    fecha:String,
    paginaPadre:mongoose.SchemaTypes.Mixed, 
    post:mongoose.SchemaTypes.Mixed,
    cpagina:mongoose.SchemaTypes.Mixed
});

module.exports = mongoose.model('paginas',esquema);
