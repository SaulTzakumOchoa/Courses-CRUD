'use strict'

let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let CursoSchema = new CursoSchema({
    nombre: {type: String},
    temarioFile: {type: String},
    temario: {type: Object},
    videoIntroduccion: {type: String},
    sumary: {},
    docente: {type: Schema.Types.ObjectId, ref: 'docentes'},
    fechaInicio: {type: Date},
    fechaFinal: {type: Date},
    status: {type: Number},
    hora: {type: String},
    duracion: {type: Number},
    valoracion: {
        rating: Number,
        listRating: [Number],
    },
    habilidadesDesarrolladas: [String],
    precio: Number,
    cupoLimite: Number,
    imagen: String,
    registrados: [{type: Schema.Types.ObjectId, ref: 'estudiantes'}],
    descripcion: String,
    requisitos: String,
    ubicacion: String,
    habilitarPublico: Boolean
})


module.exports = mongoose.model('cursos',CursoSchema);