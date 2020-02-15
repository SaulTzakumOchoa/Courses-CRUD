'use strict'

let mongoose = require('mongoose');

// 1- Inscripciones abiertas
// 2- Activo
// 3- Cupo agotado
// 4- Finalizado
// 5- Pendiente

let statusValidos = {
    values: [1, 2, 3, 4, 5],
    message: '{VALUE} no es un status válido'
}

let Schema = mongoose.Schema;
let CursoSchema = new CursoSchema({
    nombre: {type: String, minlength: 4, required: true},
    temarioFile: {type: String},
    temario: {type: Object, required: true},
    videoIntroduccion: {type: String},
    sumary: {type: String},
    docente: {type: Schema.Types.ObjectId, ref: 'docentes'},
    fechaInicio: {type: Date},
    fechaFinal: {type: Date},
    status: {type: Number, enum: statusValidos},
    hora: {type: String, required: true},
    duracion: {type: Number, required: true},
    valoracion: {
        rating: {type: Number, default: 0},
        listRating: [Number],
    },
    habilidadesDesarrolladas: [String],
    precio: {type:Number, default: 0},
    cupoLimite: {type:Number, required: true},
    imagen: {type: String, default: null},
    registrados: [{type: Schema.Types.ObjectId, ref: 'estudiantes'}],
    descripcion: {type:String, required: true},
    requisitos: {type:String, default: 'No existen requisitos'},
    ubicacion: {type:String},
    habilitarPublico: {type:Boolean}
})


module.exports = mongoose.model('cursos',CursoSchema);