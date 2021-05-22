const express = require("express");
const conectarDB = require("./config/db");
const cors =require('cors');

//crear el servidor
const app = express();

//conectar a la db
conectarDB();

//habilitar CORS
app.use(cors());

//habilitar express.json() nos evitamos usar bodyparse, para los headers etc
app.use(express.json({ extended: true }));

//puerto de la app
const PORT = process.env.PORT || 4000; //4000 o cualquiera diferente al 3000 q es el de react

//Importar Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));


//definir la pagina principal
app.get("/", (req, res) => {
  res.send("hola mundo");
});

//vamos a arrancar la app
app.listen(PORT, () => {
  console.log(`el servidor esta funcionando ${PORT}`);
});
