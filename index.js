var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoConfig = require('./config/mongo')();

// configuracion mongo
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(methodOverride());

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
