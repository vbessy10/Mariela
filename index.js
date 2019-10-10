var express = require('express');
var bodyParser = require('body-parser');
var usuariosRouter = require('./routers/usuarios-router');
var categoriasRouter = require('./routers/categorias-router');
var postsRouter = require('./routers/posts-router');
var paginasRouter = require('./routers/paginas-router');
var session = require('express-session');
var database = require('./modules/database');
//var ckeditor = require('ckeditor');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/usuarios',usuariosRouter);
app.use('/categorias',categoriasRouter);
app.use('/posts',postsRouter);
app.use('/paginas',paginasRouter);



app.use(express.static("public"));


app.listen(3300, function(){
    console.log("Servidor levantado");
});