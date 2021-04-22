const { validationResult } = require('express-validator')
const { request, response } = require('express')

const validarCampos = (req = request, res = response, next) => {

    const Errors = validationResult(req)
    if(!Errors.isEmpty()){
        return res.status(400).json(Errors)
    }

    next()


}

module.exports = {
    validarCampos
}


