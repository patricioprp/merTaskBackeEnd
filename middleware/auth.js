const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Leer el token del header
  const token = req.header("x-auth-token");

  //Revisar si no hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay Token, Permiso no valido" });
  }

  //Validar el token

  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    //agregamos un nuevo elementos la request
    //y almacenamos el id de usuario
    req.usuario = cifrado.usuario;
    next(); //siguiente middleware "proyectoController.crearProyecto"
  } catch (error) {
    res.status(401).json({ msg: "Token no valido" });
  }
};
