'use strict'

const Estudiante = require('../models/estudiante');
const Curso = require('../models/curso');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const bcrypt = require('bcrypt-nodejs');
const servicios = require('../utils/datos');

const crearEstudiante = (req, res) => {
    let params = req.body;

    let estudiante = new Estudiante(params);
    
    // Verificar duplicado
    Estudiante.find({$and: [{correo: params.correo}, {curso: params.curso}]}, (err, cursoDuplicado) => {
        if(err){
            return res.status(500).send({
                ok: false,
                err
            })
        }
        
        if(cursoDuplicado && cursoDuplicado.length > 0){
            return res.status(200).send({
                ok: false,
                message: 'Ya está inscrito al curso'
            })
        }
        
        bcrypt.hash(params.correo + params.curso, null, null, (err, hash) => {
            if(err){
                return res.status(500).send({
                    ok: false,
                    err
                })
            }
            estudiante.tokenCalificacion = hash;
            estudiante.statusCalificacion = true;
            estudiante.save(async (err, estudianteGuardado) => {
                if(err){
                    return res.status(500).send({
                        ok: false,
                        err
                    })
                }
                // Actualizar status, agregar registros
                
                await servicios.actualizarRegistros(params.curso, estudianteGuardado);
                
                res.status(200).send({
                    ok: true,
                    estudiante: estudianteGuardado
                })
            })
        })
    })
}

module.exports = {
    crearEstudiante
}