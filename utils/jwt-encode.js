'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');

let secret = 'curso node clave secreta';

exports.auth = (docente) => {
    const payload = {
        sub: docente._id,
        nombre: docente.nombre,
        correo: docente.email,
        iax: moment().unix(), // Fecha creación
        exp: moment().add(1, 'hours').unix() // Fecha expiracion
    }
    // .add(7, 'time'), days, seconds, minutes
    return jwt.encode(payload, secret);
}