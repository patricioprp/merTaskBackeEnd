const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req,res) => {

    //Revisar si hay errores
    const errores = validationResult(req); //req nos mostrara si hay algun error y sera como array
    if(!errores.isEmpty()){
        //si el array tiene algun elemento es porque tiene errores
        return res.status(400).json({errores: errores.array()});
    }
    //Extrar email y password
    const { email, password } = req.body;

    try {
        //Revisar que el usuario registrado sea unico

        let usuario =  await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe'}); //Usamos msg para express validator
        }

        //crea el nuevo usuario
        usuario = new Usuario(req.body);
        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password,salt);
        
        //guardar usuario
        await usuario.save();

        //Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        //firmar el jwt
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn:3600000
        }, (error,token) => {
            if(error) throw error;

        //mensaje de confirmacion     
            res.json({token});
        });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}