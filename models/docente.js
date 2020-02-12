'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DocenteScehma = new Schema({
    nombre: {type: String},
    cargo: {type: String},
    resumen: {type: String, maxlength: [200, 'Resumen muy largo, máximo 200']},
    totalEstudiantes: {type: Number},
    imagenPerfil: {type: String},
    email: {
        type: String,
        lowercase: true
    },
    password: {type: String},
    redesSociales: {
        facebook: {type: String, default: null},
        youtube: {type: String, default: null},
        twitter: {type: String, default: null},
        linkedin: {type: String, default: null},
    }
})

module.exports = mongoose.model('docentes', DocenteScehma);