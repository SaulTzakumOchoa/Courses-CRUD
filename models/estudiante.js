'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EstudianteSchema = new Schema({
    nombre: {type: String, required: true},
    cargo: type = String,
    statusAsistencia: type = Boolean,
    correo: {type: String, required: true},
    telefono: {type: String},
    conocimientosPrevios: {type: String},
    curso: {type: Schema.Types.ObjectId, ref: 'docente'},
    tokenCalificacion: type=String,
    statusCalificacion: type=Number
})

module.exports = mongoose.model('estudiantes', EstudianteSchema);