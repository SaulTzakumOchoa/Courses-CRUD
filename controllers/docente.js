'use strict'

const ModelDocente = require('../models/docente');
const bcrypt = require('bcrypt-nodejs');

function home(req, res) {
        
    res.status(200).send({
        message: 'Hola mundo'
    });
}

function insert(req, res) {
    console.log(req.body);
    
    res.status(200).send({
        message: 'Datos enviados correctamente'
    })
}

function crearDocente(req, res) {
    const params = req.body;
    
    let Docente = new ModelDocente();
        //{
    //     nombre: params.nombre,
    //     cargo: params.cargo,
    //     resumen: params.resumen,
    //     totalEstudiantes: params.totalEstudiantes,
    //     imagenPerfil: params.imagenPerfil,
    //     email: params.email,
    //     password: params.password,
    //     redesSociales:{
    //         facebook: params.facebook,
            
    //     }
    // }
    

        Docente.nombre = params.nombre;
        Docente.cargo = params.cargo;
        Docente.resumen =  params.resumen;
        Docente.totalEstudiantes = 0;
        Docente.imagenPerfil = params.imagenPerfil;
        Docente.email = params.email;
        Docente.password = params.password;
        Docente.redesSociales.facebook = params.facebook;
        Docente.redesSociales.youtube = params.youtube;
        Docente.redesSociales.twitter = params.twitter;
        Docente.redesSociales.linkedin = params.linkedin;

        ModelDocente.find({correo: params.correo}, (err,duplicado) => {
            if(err){
                res.status(500).send({
                    message: 'Correo duplicado',
                    err,
                    status: false,
                })
            }

            if(duplicado && duplicado.length >= 1){
                res.status(200).send({
                    message: 'Docente existente',
                    status: false
                })
            } else{
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    if(err){
                        res.status(500).send({
                            message: 'Error al insertar docente',
                            err,
                            status: false
                        })
                    }
                    Docente.password = hash;
                    
                    Docente.save((err, docenteDB) => {
                        res.status(200).send({
                            docente: docenteDB,
                            status: true
                        })
                    })
                })
            }
        })

}

module.exports = {
    home,
    insert,
    crearDocente
}