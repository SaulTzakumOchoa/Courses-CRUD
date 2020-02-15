'use strict'

let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let EtiquetaSchema = new CursoSchema({
    etiqueta: String,
    referenciaID: {type: Schema.ObjectId, ref: 'cursos'}
})


module.exports = CursoSchema;