const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Users = require('../models/users');
const { getJwt } = require('../helpers/jwt');



const getData = async (req, res) =>{
    const usuarios = await Users.find()

    res.json({
        usuarios
    })
}

const createUser = async (req = request, res = response) => {

    try {

    const { name, email, password} = req.body;
    //confirmar si el usuario existe
    const usuario = await Users.findOne({ email });
    if(usuario){
        return res.json({
            ok: false,
            msg: 'El correo esta en uso prueba con otro'
        });
    };


    // Guardar usuario con modelo de datos
    const userDB = new Users({ name, email, password });

    // Esconder Password
    const salt = bcryptjs.genSaltSync(10);
    userDB.password = bcryptjs.hashSync(password, salt);

    // Generar JWT
    const token = await getJwt( userDB.id, userDB.name );


    // Guardar usuario en la Base de datos
    await userDB.save();

    // Respuesta del servidor
    res.status(201).json({
        ok: true,
        name: userDB.name,
        token,
        email: userDB.email
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

}

const logIn = async (req = request, res = response) => {

    try {

        const { email, password} = req.body;

        // Comprobar si el email existe
        const dbUser = await Users.findOne({ email });
        if(!dbUser){
            return res.json({
                ok: false,
                msg: 'Este email no existe, intente colocarlo correctamente'
            });
        };

        // comparar password
        const validPassword = bcryptjs.compareSync(password, dbUser.password);
        if(!validPassword){
            return res.json({
                ok: false,
                msg: 'La password no coincide, intentelo de nuevo'
            });
        };

        // Generar JWT
        const token = await getJwt( dbUser.id, dbUser.name );

        // Respuesta del servidor
        return res.json({
            ok: true,
            token,
            name: dbUser.name,
            email: dbUser.email
        })
        


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    createUser,
    logIn,
    getData
}

