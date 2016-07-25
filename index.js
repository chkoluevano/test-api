var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

// configuracion
/*
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({'extended':'true'}));            

*/
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(methodOverride());


// conexion
//'mongodb://localhost:27017/mono-testing',function(err, res){

mongoose.connect('mongodb://usrpruebas:pwdatencion@ds023475.mlab.com:23475/atencion_ciudadana_mongo',function(err, res){
    if (!err){
        console.log("conexion ok")
    }
    else{
        console.log("error: " + erro);
    }
});

// default route
app.get('/', function(req, res) {
  res.send("...fuck yeah!!!");
});


// server start 
app.listen(8080, function(e){
 console.log("escuchando puerto 8080");
});


routesAsuntos = require('./routes/asuntos')(app);
routesOrigenes = require('./routes/origen')(app);



