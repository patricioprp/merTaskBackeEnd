const mongoose = require("mongoose");
// mongoose doc https://mongoosejs.com/docs/schematypes.html
const UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true, //Elimina los espacios en blanco al inicio y al final
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  registro: {
    type: Date,
    default: Date.now(), //el back generara la fecha alctual de registro
  },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
//Registramos el modelo Usuario con el schema UsuarioSchema
