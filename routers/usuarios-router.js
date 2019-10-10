var express = require('express');
var usuario = require('../models/usuario');
var cotrol = require('../controlles/control');
var session = require('express-session');
var auth = require('../middlewares/auth');
var router = express.Router();

var app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//Registrar un usuario
router.post('/',function(req,res){
    if(req.body.tipo==1)
        req.body.tUsuario='Registrado';
    else{
        req.body.tipo=0;
        req.body.tUsuario='Administrador';
    }

    let user = new usuario({
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        usuario:req.body.usuario,
        correo:req.body.correo,
        genero:req.body.genero,
        contrasenia:req.body.contrasenia,
        fechaNacimiento:req.body.nacimiento,
        tipoUsuario:{
            id:req.body.tipo,
            tUsuario:req.body.tUsuario
        }
    }); 
    user.save()
    .then(function(obj){
        res.send(obj);
        res.end();
    })
    .catch(function(error){
        res.send(error);
        res.end();
    });
});

//Eliminar un usuario
router.delete('/:id',function(req,res){
    usuario.remove({_id:req.params.id})
    .then((result)=>{
        res.send(result);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener un usuario
router.get('/:id',function(req,res){
    usuario.find({_id:req.params.id})
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});



//Obtener un usuario de login
router.get('/login/:correo/:contrasenia',function(req,res){
    usuario.find({correo:req.params.correo, contrasenia:req.params.contrasenia})
    .then((data)=>{
        req.session.user_id = data[0]._id
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener todos los usuarios
router.get('/',function(req,res){
    usuario.find()
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Actualizar un usuario
router.put('/:id',function(req,res){  
    if(!(req.body.newPassword==undefined||req.body.newPassword==null))
        req.body.acPassword=req.body.newPassword;
    
    if(req.body.acTipo==0)
        req.body.tUsuario='Administrador';
    else if(req.body.acTipo==1){
        req.body.tUsuario='Registrado';
    }

   usuario.update(
       {_id:req.params.id},
       {
            nombre:req.body.acNombre,
            apellido:req.body.acApellido,
            correo:req.body.acEmail,
            contrasenia:req.body.contrasenia,
            fechaNacimiento:req.body.acNacimiento,
            tipoUsuario:{
                id:req.body.acTipo,
                tUsuario:req.body.tUsuario
            },
            genero:req.body.genero
        }
   )
   .then((result)=>{
        res.send(result);
        res.end();
   })
   .catch((error)=>{
        res.send(error);
        res.end();
   });
});

// para la validacion de usuarios
/*router.get('/private/login', auth, function(req, res){
    res.status(200).send({ message: 'Acceso autorizado' })
});*/

router.post('/private/login', cotrol.inicioSesion);

module.exports = router;