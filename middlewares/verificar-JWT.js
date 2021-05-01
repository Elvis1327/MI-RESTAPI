const { request, response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req = request, res = response, next) =>{

    try{

        const token = req.header('x-token');
        if(!token){
            return res.status(400).json({
                ok: false,
                msg: 'Debe Headers en la request obligatoriamente'
            });
        };
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;


    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
        next();
}

module.exports = {
    validarJWT
}
