'use strict'

const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./app');

const optiosMongoDb = {'useCreateIndex': true, useNewUrlParser: true, useUnifiedTopology: true };

mongoose.Promise = global.Promise;


mongoose.connect(config.connection, optiosMongoDb)
.then(() => {
    console.log('Conexión exitosa');

    app.listen(config.port, () => console.log('Escuchando puerto:', config.port))
})
.catch(err => console.log(err));