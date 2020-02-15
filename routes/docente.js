'use strict'

const express = require('express');
const ControladorDocente = require('../controllers/docente');

const api = express.Router();

api.get('/home', ControladorDocente.home);
api.post('/insert', ControladorDocente.insert);
api.post('/crearDocente', ControladorDocente.crearDocente);
api.get('/obtenerDocente/:id', ControladorDocente.ObtenerDocente);
api.get('/obtenerDocentes/:page?/:itemPerPage?', ControladorDocente.ObtenerDocentes);
api.post('/login', ControladorDocente.login);
module.exports = api;