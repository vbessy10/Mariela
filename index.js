var express = require('express');
var bodyParser = require('body-parser');
var usuariosRouter = require('./routers/usuarios-router');
var categoriasRouter = require('./routers/categorias-router');
var postsRouter = require('./routers/posts-router');
var database = require('./modules/database');
//var ckeditor = require('ckeditor');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/usuarios',usuariosRouter);
app.use('/categorias',categoriasRouter);
app.use('/posts',postsRouter);

app.use(express.static("public"));

/*
app.get('/admin/', function(req, res) {
    res.sendFile(__dirname + '/public/admin.html');
    //res.end();
});
*/

app.listen(3300, function(){
    console.log("Servidor levantado");
});