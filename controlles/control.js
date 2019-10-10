'use strict'

var moongose = require('mongoose');
var usuarios = require('../models/usuario');
var service = require('../services');

function registro(req, res){
    const usuario = new usuarios({
        correo: req.body.correo,
        usuario:req.body,usuario,
        nombre:req.body,nombre,
        apellido:req.body,apellido,
    })

    usuario.save((error)=>{
        if(error) res.status(500).send({ message: `Error al crear el usuario: ${error}` })
        return res.status(200).send({ token: service.createToken(usuario) })

    })
}

function inicioSesion(req, res){
    usuarios.find({correo: req.body.correo},(error, usuario)=>{
        if(error)
            return res.status(500).send({ message: error})

        if(!usuario) 
            return res.status(404).send({message:'No esiste el usuario '+usuario})

        req.usuario = usuario
        res.status(200).send({
            message: 'Usuario autorizado',
            token: service.createToken(usuario)
        })
    })
}

module.exports = {
    registro,
    inicioSesion
}