'use strict'

const Estudiante = require('../models/estudiante');
const Curso = require('../models/curso');
const Docente = require('../models/docente');

async function actualizarRegistros(cursoId, estudiante){
    let updateDocentes = {};
    let updateCurso = {};

    const curso = await Curso.findById({_id: cursoId});

    if(curso['cupoLimite'] == 0){
        updateCurso = {$set: {cupoLimite:0, status: 3}}
    } else{
        updateCurso = {$inc:{cupoLimite: -1}, $push: {registrados: estudiante._id}};
        updateDocentes = {$inc: {totalEstudiantes: 1}}

        await Docente.findByIdAndUpdate({_id: curso.docente}, updateDocentes, {upsert: true, useFindAndModify: false});
    }

    await Curso.findByIdAndUpdate({_id: cursoId},updateCurso, {upsert: true, useFindAndModify: false});
}

module.exports = {
    actualizarRegistros
};