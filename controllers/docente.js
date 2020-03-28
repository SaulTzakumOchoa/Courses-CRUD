'use strict'

const ModelDocente = require('../models/docente');
const bcrypt = require('bcrypt-nodejs');
const paginate = require('mongoose-pagination');
const {auth} = require('../utils/jwt-encode');

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
                return res.status(500).send({
                    message: 'Correo duplicado',
                    err,
                    status: false,
                })
            }

            if(duplicado && duplicado.length >= 1){
                return res.status(200).send({
                    message: 'Docente existente',
                    status: false
                })
            } else{
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    if(err){
                        return res.status(500).send({
                            message: 'Error al insertar docente',
                            err,
                            status: false
                        })
                    }
                    Docente.password = hash;
                    
                    Docente.save((err, docenteDB) => {
                        return res.status(200).send({
                            docente: docenteDB,
                            status: true
                        })
                    })
                })
            }
        })

}

function ObtenerDocente(req, res){
    let params = req.params;
    let id = params.id;

    ModelDocente.findById(id, {password: 0},(err, docenteDB) => {
        if(err){
            return res.status(500).send({
                ok: false,
                err
            })
        }

        if(!docenteDB){
            return res.status(400).send({
                ok: false,
                err: {
                    message: 'Docente no encontrado'
                }
            })
        }

        return res.send({
            ok: true,
            docente: docenteDB
        })
    })
}

function ObtenerDocentes(req, res){
    let params = req.params;
    
    let page = Number(params.page) || 1;
    let itemPerPage = Number(params.itemPerPage) || 5;
   
    ModelDocente.find({}, {password: 0}).paginate(page, itemPerPage,(err, docentes, total) => {
        if(err){
            return res.status(500).send({
                ok: false,
                err
            })
        }

        if(!docentes){
            return res.status(400).send({
                ok: false,
                err: {
                    message: 'Docentes no encontrados'
                }
            })
        }

        return res.send({
            ok: true,
            docentes,
            pages: Math.ceil(total/itemPerPage)
        })
    })
}

function login(req, res){
    let params = req.body;
    let password = params.password;
    let email = params.email;
    
    ModelDocente.findOne({email},(err, docenteDB) => {
        if(err){
            return res.status(500).send({
                ok: false,
                err,
            })
        }
        
        if(!docenteDB){
            return res.status(500).send({
                ok: false,
                err: {
                    message:'Usuario o contraseña incorrectos'
                }
            })
        }

        bcrypt.compare(password, docenteDB.password, (err, verificado) => {
            if(err){
                return res.status(500).send({
                    ok: false,
                    err
                })
            }

            if(!verificado){
                return res.status(400).send({
                    ok: false,
                    err: {
                        message: 'Usuario o Contraseña incorrectos'
                    }
                })
            }

            docenteDB.password = undefined;
            let token = auth(docenteDB);

            return res.status(200).send({
                ok: true,
                docente: docenteDB,
                token
            })
        });
    })
}

function actualizarDocente(req, res){
    const id = req.params.id;
    const update = req.body;

    if(id != req.docente.sub){
        return res.status(500).send({
            ok: false,
            err:{
                message: 'El docente no tiene permisos',
                ok: false
            }
        })
    }

    ModelDocente.findOneAndUpdate({_id:id}, update, {new: true}, (err, docenteDB) => {
        if(err){
            return res.status(500).send({
                ok: false,
                err
            })
        }

        if(!docenteDB){
            return res.status(400).send({
                ok: false,
                err: {
                    message: 'Docente no encontrado'
                }
            })
        }

        return res.send({
            ok: true,
            docente: docenteDB
        })
    })

}

let eliminarDocente = (req, res) => {

}

module.exports = {
    home,
    insert,
    crearDocente,
    ObtenerDocente,
    ObtenerDocentes,
    login,
    actualizarDocente,
    eliminarDocente,
}