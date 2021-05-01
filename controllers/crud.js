const { request, response } = require('express');
const Crud = require('../models/crud');

// GETTTTT
const getUsers = async (req = request, res = response) => {

    try {
        
        const usersDB = await Crud.find();
        

        // Respuesta del server
        res.json({
            usersDB,
            msg: 'All Users'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

};

// POSTTTT
const createUsers = async (req = request, res = response) => {

    try {
        const { name, email, salary } = req.body;

        // Validar si el usuario existe
        const usuario = await Crud.findOne({ email });
        if(usuario){
            return res.status(400).json({
                msg: 'Este email esta en uso prueba con otro'
            });
        };

        // Guardando en la db
        const crudDB = new Crud({name, email, salary});

        // Guardar info en la db
        await crudDB.save();

        // Respuesta del servidor
        res.json({
            msg: 'The new user has been created',
            name: crudDB.name,
            email: crudDB.email,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

// PUTTTTTT
const updateUser = async () => {

}

// DELETEEE
const deleteUser = async () => {

}



module.exports = {
    getUsers,
    createUsers,
    updateUser,
    deleteUser
}