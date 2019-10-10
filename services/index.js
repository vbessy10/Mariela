'use strict'

 var jwt = require('jwt-simple');
 var moment = require('moment');
 var config = require('../config');
 
 function createToken(usuario){
    const payload = {
        sub: usuario._id,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
 }
    function decodeToken(token){
        const decoded = new Promise((resolve, reject)=>{
            try {
                const payload = jwt.decode(token, config.SECRET_TOKEN)

                if(payload.exp <= moment().unix()){
                    reject({
                        status:401,
                        message: 'El token ha expirado'
                    })
                }

                resolve(payload.sub)
            
            } catch (error) {
                reject({
                    status:500,
                    message:'Token invalido'
                })
            }
        })
        return decoded
    }


 module.exports = {
    createToken,
    decodeToken
}