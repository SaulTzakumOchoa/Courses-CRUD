let validar = (correo) => {
    let rex = /^.+@.+/
    return rex.test(correo);
}

module.exports = {
    validar,
}