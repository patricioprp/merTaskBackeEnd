//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crea un proyecto
//  api/proyectos
router.post('/',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

//obtener todos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

//editar un proyecto
router.put('/:id',    
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizaProyecto
);
module.exports = router;