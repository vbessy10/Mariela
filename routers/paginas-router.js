var express = require('express');
var pagina = require('../models/pagina');
var router = express.Router();
var mongoose = require('mongoose');

//Registrar una pagina
router.post('/',function(req,res){
    let e = new pagina({
        titulo:req.body.titulo,
        favicon:req.body.favicon,
        logotipo:req.body.logotipo,
        autor:mongoose.Types.ObjectId(req.body.autor),
        descripcion:req.body.descripcion,
        fecha:req.body.fecha,
        paginaPadre:{
            idpadre:mongoose.Types.ObjectId(req.body.idpadre),
            padre:req.body.padre
        },
        post:req.body.post,
        cpagina:req.body.cpagina
    }); 
    e.save()
    .then(function(obj){
        res.send(obj);
        res.end();
    })
    .catch(function(error){
        res.send(error);
        res.end();
    });
});

//Eliminar una pagina
router.delete('/:id',function(req,res){
    pagina.remove({_id:req.params.id})
    .then((result)=>{
        res.send(result);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener una pagina
router.get('/:id',function(req,res){
    pagina.find({_id:req.params.id})
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener todas las paginas
router.get('/',function(req,res){
    //pagina.find()
    pagina.aggregate([
        {
            $lookup:{
                from:"usuarios",
                localField:"autor",
                foreignField:"_id", 
                as:"autor"
            }
        }
    ])
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Actualizar una pagina
router.put('/:id',function(req,res){  
    pagina.update(
       {_id:req.params.id},
       {
            titulo:req.body.titulo,
            favicon:req.body.favicon,
            logotipo:req.body.logotipo,
            autor:mongoose.Types.ObjectId(req.body.autor),
            descripcion:req.body.descripcion,
            fecha:req.body.fecha,
            paginaPadre:{
                idpadre:mongoose.Types.ObjectId(req.body.idpadre),
                padre:req.body.padre
            },
            post:req.body.post,
            cpagina:req.body.cpagina
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

module.exports = router;