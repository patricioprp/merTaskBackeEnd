const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearProyecto = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    //Crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);
    //vamos a guardar el creador via jwt
    proyecto.creador = req.usuario.id;
    //guardamos el proyecto
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    }); //sort creado:-1 ordena  ubicando al mas nuevo al principio
    return res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//actualiza un proyecto
exports.actualizaProyecto = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
    //extraer la informacion del proyecto
    let { nombre } = req.body;
    let nuevoProyecto = {};

    if (nombre) {
      nuevoProyecto = nombre;
    }

  try {
    //revisar el id
    let proyecto = await Proyecto.findById(req.params.id);

    //si el proyecto existe o no
    if(!proyecto){
        return res.status(404).json({msg:'Proyecto no encontrado'});
    }
    //verificar el creador del proyecto, hacemos lo de toString porque en la db no se guarda solo el id
    if(proyecto.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg:'No autorizado'});
    }
        // actualizar
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoProyecto}, { new: true });
        res.json({proyecto});
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
