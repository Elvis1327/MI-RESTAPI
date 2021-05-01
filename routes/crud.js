const { Router } = require('express'); 
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsers, createUsers, updateUser, deleteUser } = require('../controllers/crud');


const router = Router();

// Peticion Get
router.get('/getuser', getUsers);

// Peticion Post
router.post( '/createuser', [

    check('name', 'The name is required'),
    check('email', 'The email is required').isEmail(),
    check('salary', 'El salario debe tener mas de 5 caracteres').isLength({min: 5}),
    validarCampos

],createUsers)

// peticion Put
router.post( '/updateuser/:id', updateUser)

// Peticion Delete
router.delete('deleteUser/:id', deleteUser)


module.exports = router;
