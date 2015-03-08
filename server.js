// FICHERO PRINCIPAL DEL SERVIDOR

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var speakers = require('./server/routes/speakers');

var config = require('./server/config/config.js');

var mongoose = require('mongoose');

var app = express();

// Usar mensajes flash
var flash = require('connect-flash');
// Passport
var passport = require('passport');
// Se incluye la configuracíon del middleware Passport (para autenticacion)
require('./server/config/passport.js')(passport);


// GESTION DE SESIONES DE USUARIO Y ALMACENAMIENTO EN MONGO. USADO CON PASSPORT
/*
    npm install express-session connect-mongo --save
*/
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// Se conecta a la base de datos
mongoose.connect(config.url);
mongoose.connection.on('error', function() {
    console.log('Error al conectar a la base de datos ');
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// secret for session
app.use(session({
    secret: 'TOKEN',
    saveUninitialized: true,
    resave: true,
    //store session on MongoDB using express-session + connect mongo
    store: new MongoStore({
        url: config.url,
        collection : 'sessions'
    })
}));

app.use(flash());
// Passport
// Init passport authentication
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());



// RUTAS (URLs) DE LA APLICACION
app.use('/', routes);
app.use('/users', users);
// API REST
app.use('/api', speakers);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// OTRA MANERA DE CONECTARSE A LA BASE DE DATOS CON FUNCION DE CALLBACK
/*
mongoose.connect(config.url, function(err, res) {
    if (err) {
        console.log('Error al conectar a la base de datos ');
    } else {
        console.log('Conectado a la base de datos');
    }
});
*/


// Se pone a la escucha el servidor
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;
