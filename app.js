'use strict'
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// section 1: importación de rutas
const routesDocente = require('./routes/docente');
const routesCurso = require('./routes/curso');
const routesEstudiante = require('./routes/estudiante');

// section 2: carga de middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// section 3: cors
app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Oringin', '*');
    res.header('Acces-Control-ALlow-Headers', '*');
    res.header('Acces-Control-Allow-Methods', '*');
    res.header('Allow', 'GET, POST, PUT, OPTIONS, PUT, DELETE');

    next();
});

// section 4: carga de rutas
app.use('/api',routesDocente);
app.use('/api', routesCurso);
app.use('/api', routesEstudiante);

app.use('/uploads', express.static('uploads', {redirect: false}))

// section 5: exportacion de app
module.exports = app;