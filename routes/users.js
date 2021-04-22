const { check } = require('express-validator');
const { Router } = require('express');
const { createUser, logIn } = require( '../controllers/auth' );
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/create', [

    check('name', 'El name debe contener mas de 5 caracteres').isLength({ min: 5 }),
    check('email', 'El email debe tener caracter validos').isEmail(),
    check('password', 'El password debe tener mas de 6 caracteres'),
    validarCampos

], createUser)

router.post('/join', [

    check('email', 'El email debe tener caracteres permitidos').isEmail(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({min: 6}),
    validarCampos

], logIn)






module.exports = router;






