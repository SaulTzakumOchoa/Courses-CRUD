'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tipoValues = {
    values: ['curso', 'docente'],
    message: '{VALUE} tipo no válido'
}

let ComentarioSchema = new Schema({
    comentario: {type: String},
    tipo: {type: String, enum: tipoValues},
    emisorEstudiante: {type: Schema.Types.ObjectId, ref: 'estudiantes'},
    receptorDocente: {type: Schema.Types.ObjectId, ref: 'docentes'},
    receptorCurso: {type: Schema.Types.ObjectId, ref: 'cursos'},
    calificacion: {type: Number, max: [10, 'No existe el rango']}
})

module.exports = mongoose.model('comentarios', ComentarioSchema);