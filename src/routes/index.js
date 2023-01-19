const { Router } = require("express");
const req = require("express/lib/request");
const jwt = require('jsonwebtoken');

const router = Router();

const User = require('../models/user');

router.get('/', (req, res) => res.send("Coveicydet"))

router.post('/register', async (req, res) => {
    const { 
        nombre, 
        apellidoPaterno,
        apellidoMaterno,
        rfc,
        curp,
        sexo,
        email,
        password } = req.body;
    const newUser = new User({ 
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        rfc,
        curp,
        sexo,
        email,
        password
    });
    await newUser.save();
    
    const token = jwt.sign({_id: newUser._id}, 'secretKey', {
        expiresIn: 1800 //30 minutos
    });

    res.status(200).json({token});

})

router.get('/user', async (req, res) => {
    const user = await User.find()
    return res.json(user)
})

router.post('/signin', async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if(!user) return res.status(401).send("El email ingresado no se encuentra registrado");
    if(user.password !== password) return res.status(401).send("La contraseña es incorrecta");

    const token = jwt.sign({ _id: user._id }, 'secretKey', {
        expiresIn: 1800 //30 minutos
    });
    return res.status(200).json({ token });

});

module.exports = router;