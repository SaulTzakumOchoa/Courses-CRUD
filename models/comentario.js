'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ComentarioSchema = new Schema({
    comentario: {type: String},
    tipo: {type: String},
    emisorEstudiante: {type: Schema.Types.ObjectId, ref: 'estudiantes'},
    receptorDocente: {type: Schema.Types.ObjectId, ref: 'docentes'},
    receptorCurso: {type: Schema.Types.ObjectId, ref: 'cursos'},
    calificacion: {type: Number}
})

module.exports = mongoose.model('comentarios', ComentarioSchema);