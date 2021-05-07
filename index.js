const express = require('express');
const conectarDB  = require('./config/db');

//crear el servidor
const app = express();

//conectar a la db
conectarDB();

//puerto de la app
const PORT = process.env.PORT || 4000; //4000 o cualquiera diferente al 3000 q es el de react

//definir la pagina principal
app.get('/',(req,res) => {
    res.send('hola mundo');
});

//vamos a arrancar la app
app.listen(PORT, () => {
    console.log(`el servidor esta funcionando ${PORT}`);
});