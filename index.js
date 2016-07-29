var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuracion mongo
var mongoConfig = require('./config/mongo')();
var allowMethods = function(req, res, next) {
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS"); next();
}

// configuracion app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(methodOverride());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// default route
app.get('/', function(req, res) {
    res.send("...fuck yeah!!!");
});


// server start 
app.listen(8080, function(e) {
    console.log("escuchando puerto 8080");
});


routesAsuntos = require('./routes/asuntos')(app);
routesPeticiones = require('./routes/peticiones')(app);
routesUsuarios = require('./routes/usuarios')(app);
