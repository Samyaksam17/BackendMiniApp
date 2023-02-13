const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const emailValidator=require('email-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('./config/db');
// const passport = require('passport');



// connect to database
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

// on connection
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

// on error
mongoose.connection.on('error', (err) => {
    console.log('database connection error ' + err);
});

// initialize express
var app = express();


// Passport init
// app.use(passport.initialize());
// app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,enctype,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// routes
const index = require('./routes/index');
const student = require('./routes/student');



// entry points
app.use('/', index);
app.use('/student', student);

// Set Port
app.set('port', 3002);

app.listen(app.get('port'), () => {
    console.log('Server started on port ' + app.get('port'));
});









