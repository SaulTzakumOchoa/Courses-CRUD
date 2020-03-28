'use strict'

const jwt = require('jwt-simple');
let moment = require('moment');

let secret = 'curso node clave secreta';

exports.auth_decode = (req, res, next) => {
    
    if(!req.headers.authorization){
        return res.status(403).send({
            ok: false,
            message: 'Credenciales de autorización no encontradas'
        })
    } else{
        const token = req.headers.authorization.replace(/['"]+/g, '');
        let payload='';
        try{
            payload = jwt.decode(token, secret);
            
            // if(payload.exp <= moment.unix()){
            //     return res.status(401).send({
            //         ok: false,
            //         message: 'Token inválido'
            //     })
            // }
        }catch(ex){
            return res.status(401).send({
                ok: false,
                message: 'Token inválido',
                err: String(ex)
            })
        }

        req.docente = payload;
        next();
    }
}