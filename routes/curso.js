'use strict'

const express = require('express');
const ControladorCurso = require('../controllers/curso');
const { auth_decode} = require('../utils/jwt-decode');
const multipart = require('connect-multiparty');
const path_imgs = multipart({uploadDir: './upload'});

const api = express.Router();

api.post('/crearCurso', auth_decode,ControladorCurso.crearCurso);
api.get('/obtenerCursos',ControladorCurso.obtenerCursos);
api.get('/obtenerCurso/:id',ControladorCurso.obtenerCurso);
api.post('/subirImg/:id', [auth_decode, path_imgs],ControladorCurso.cargarImagen);
api.put('/actualizarCurso/:id', auth_decode, ControladorCurso.actualizarCurso);

module.exports = api;