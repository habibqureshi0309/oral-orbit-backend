'use strict';
const cors = require('cors')
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express()

// var corsOptions = {
//     origin: 'http://localhost:8080'
// }

//Middlewares

app.use(cors())
// app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({exrended: true}))


app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Routers..
const router = require('./routes/user.routes')
app.use('/api/users', router)


//Testing api

app.get('/', (req, res) => {
    res.json({message: 'Hellow from habib'})
})

const port = 8080

//Server

app.listen(port, () => {
    console.log('Server is running')
})