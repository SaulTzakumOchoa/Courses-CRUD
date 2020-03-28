'use strict'

const Curso = require('../models/curso');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');


const crearCurso = (req, res) => {
    let params = req.body;
    let curso = new Curso(params);
    curso.docente = req.docente.sub;

    curso.save((err, cursoDB) => {
        if(err){
            return res.status(500).send({
                message: 'No se puede cargar el curso',
                err,
                status: false,
            })
        }

        return res.status(200).send({
            curso: cursoDB,
            status: true
        })
    })
}

const obtenerCursos = (req, res) => {

    let params = req.params;
    
    let page = Number(params.page) || 1;
    let itemPerPage = Number(params.itemPerPage) || 5;
   
    Curso.find({status: {$ne: 5}}, {password: 0}).paginate(page, itemPerPage,(err, curso, total) => {
        if(err){
            return res.status(500).send({
                ok: false,
                err
            })
        }

        if(!curso){
            return res.status(400).send({
                ok: false,
                err: {
                    message: 'Docentes no encontrados'
                }
            })
        }

        return res.send({
            ok: true,
            curso,
            pages: Math.ceil(total/itemPerPage)
        })
    })
}

const obtenerCurso = (req, res) => {
    let params = req.params;
    let id = params.id;

    Curso.findById(id, {password: 0})
        .populate('docente', 'nombre email')
        .exec((err, cursoDB) => {
            if(err){
                return res.status(500).send({
                    ok: false,
                    err
                })
            }

            if(!cursoDB){
                return res.status(400).send({
                    ok: false,
                    err: {
                        message: 'Docente no encontrado'
                    }
                })
            }

            return res.send({
                ok: true,
                curso: cursoDB
            })
    })
}

const cargarImagen = (req, res) => {
    console.log(req.files);
    let cursoID = req.params.id;
    if(req.files){
        let pathFile = req.files.archivo.path;
        const nameCut = req.files.archivo.name.split('.');
        const extFile = nameCut[nameCut.length-1];
        let nameFile = `${cursoID}.${extFile}`;

        let oldPath = path.join(__dirname, '../', pathFile);
        console.log(oldPath);
        
        let newPath = path.join(__dirname, '../upload', nameFile);
        console.log(newPath);
        
        fs.renameSync(oldPath, newPath);

        if(extFile == 'png' || extFile == 'jpg' || extFile == 'jpeg'){
            Curso.findByIdAndUpdate({_id: cursoID}, {image: `${config.host}/upload/${nameFile}`}, (err, imgActualizado) => {
                if(err){
                    return res.status(500).send({
                        ok: false,
                        err
                    })
                }

                if(!imgActualizado){
                    return res.status(400).send({
                        ok: false,
                        err: {
                            message: 'Curso no encontrado'
                        }
                    })
                }

                res.send({
                    ok: true,
                    message: 'Imagen actualizada'
                })
            })
        } else{
            fs.unlink(newPath, (err, deleted) => {

            })
            return res.status(200).send({
                ok: false,
                err: {
                    message: 'Archivo con extensión inválido',
                }
            })
        }
    } else{
        return res.status(400).send({
            ok: false,
            err: {
                message: 'Archivo requerido',
            }
        })
    }
}

function actualizarCurso(req, res){
    const id = req.params.id;
    const update = req.body;

    Curso.findOneAndUpdate({_id:id}, update, {new: true}, (err, cursoDB) => {
        if(err){
            return res.status(500).send({
                ok: false,
                err
            })
        }

        if(!cursoDB){
            return res.status(400).send({
                ok: false,
                err: {
                    message: 'Curso no encontrado'
                }
            })
        }

        return res.send({
            ok: true,
            curso: cursoDB
        })
    })

}
module.exports = {
    crearCurso,
    obtenerCursos,
    obtenerCurso,
    cargarImagen,
    actualizarCurso
}