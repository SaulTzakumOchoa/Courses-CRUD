'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {validar} = require('../validaciones/correo');

let EstudianteSchema = new Schema({
    nombre: {type: String,
        required: true,
        minlength: 10,
        required: true,
        match: [/^[a-zA-Z ]+$/]
    },
    cargo: type = String,
    correo: {
        type: String,
        lowercase: true,
        validate: [validar, 'Este correo no es válido'],
    },
    telefono: {
        type: String,
        match: [/\d{3}-\d{3}-\d{4}/]
    },
    conocimientosPrevios: {type: String},
    curso: {type: Schema.Types.ObjectId, ref: 'cursos'},
    tokenCalificacion: {type = String},
    statusCalificacion: {type = Boolean}
})

module.exports = mongoose.model('estudiantes', EstudianteSchema);