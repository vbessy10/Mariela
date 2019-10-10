var express = require('express');
var entrada = require('../models/post');
var router = express.Router();
var mongoose = require('mongoose');

//Registrar una entrada
router.post('/',function(req,res){
    let e = new entrada({
        titulo:req.body.titulo,
        autor:mongoose.Types.ObjectId(req.body.autor),
        fecha:req.body.fecha,
        categoria:{
            idCategoria:mongoose.Types.ObjectId(req.body.idCategoria),
            categoria:req.body.categoria
        },
        comentarios:req.body.vComentario,
        post:req.body.post
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

//Eliminar un post
router.delete('/:id',function(req,res){
    entrada.remove({_id:req.params.id})
    .then((result)=>{
        res.send(result);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener un post
router.get('/:id',function(req,res){
    entrada.find({_id:req.params.id})
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener todos los posts
router.get('/',function(req,res){
    //entrada.find()
    entrada.aggregate([
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

//Actualizar un post
router.put('/:id',function(req,res){  
    entrada.update(
       {_id:req.params.id},
       {
            titulo:req.body.titulo,
            autor:req.body.autor,
            fecha:req.body.fecha,
            categoria:{
                idCategoria:req.body.idCategoria,
                categoria:req.body.categoria
            },
            comentarios:req.body.vComentario,
            post:req.body.post
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