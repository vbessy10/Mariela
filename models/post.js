var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    titulo:String,
    autor:mongoose.Types.ObjectId,
    fecha:String,
    categoria:mongoose.SchemaTypes.Mixed, 
    comentarios:String, 
    post:mongoose.SchemaTypes.Mixed
});

module.exports = mongoose.model('posts',esquema);
