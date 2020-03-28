'use strict'

const express = require('express');
const ControladorEstudiante = require('../controllers/estudiante');
const { auth_decode} = require('../utils/jwt-decode');
const multipart = require('connect-multiparty');
const path_imgs = multipart({uploadDir: './upload'});

const api = express.Router();

api.post('/crearEstudiante', ControladorEstudiante.crearEstudiante);

module.exports = api;