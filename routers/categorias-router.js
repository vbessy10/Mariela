var express = require('express');
var categoria = require('../models/categoria');
var router = express.Router();

//Registrar una categoria
router.post('/',function(req,res){
    let cat = new categoria({
        nombre:req.body.inputCategoria,
        descripcion:req.body.descripcion
    }); 
    cat.save()
    .then(function(obj){
        res.send(obj);
        res.end();
    })
    .catch(function(error){
        res.send(error);
        res.end();
    });
});

//Eliminar un categoria
router.delete('/:id',function(req,res){
    categoria.remove({_id:req.params.id})
    .then((result)=>{
        res.send(result);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener una categoria
router.get('/:id',function(req,res){
    categoria.find({_id:req.params.id})
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener todas las categorias
router.get('/',function(req,res){
    categoria.find()
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Actualizar una categoria
router.put('/:id',function(req,res){  
   categoria.update(
       {_id:req.params.id},
       {
            nombre:req.body.nombre,
            descripcion:req.body.descripcion
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