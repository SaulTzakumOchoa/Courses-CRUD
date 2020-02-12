'use strict'

const express = require('express');
const ControladorDocente = require('../controllers/docente');

const api = express.Router();

api.get('/home', ControladorDocente.home);
api.post('/insert', ControladorDocente.insert);
api.post('/crearDocente', ControladorDocente.crearDocente);

module.exports = api;