'use strict'

let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let EtiquetaSchema = new CursoSchema({
    etiqueta: {type: String, unique: true, lowercase: true, required: [true, 'etiqueta requerida']},
    referenciaID: [{type: String}]
})


module.exports = mongoose.model('etiquetas', EtiquetaSchema);