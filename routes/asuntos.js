module.exports=function(app){

	// Asuntos model //
	var Asunto = require('../models/asunto.js');


	// All Routes functions
	findAllAsuntos = function(req, res){
		console.log('GET - /asuntos');
		 return Asunto.find(function(err, asuntos) {
            if (!err){
                res.send(asuntos)
            }
            else{
            	res.statusCode = 500;
  				console.log('Internal error(%d): %s',res.statusCode,err.message);
  				return res.send({ error: 'Error asunto' });

            }
           
        });
	};

	findById = function(req, res){
		console.log('GET - /asuntos/:id');
		console.log('find ' + req.params.id);
		return Asunto.findById(req.params.id, function(err, asunto){
			if (!asunto){
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}
			if (!err){
				return res.send({ status: 'OK', asunto:asunto });
			}
			else{
				res.statusCode = 500;
  				console.log('Internal error(%d): %s',res.statusCode,err.message);
  				return res.send({ error: 'Error asunto' });
			}
		});


	};

 	addAsunto = function(req, res){
 		console.log('POST - /asunto');
 		console.log(req.body);

 		var asunto = new Asunto({
 			folio: req.body.folio,
 			descripcion: req.body.descripcion,
 			direccion_reporte: {
		  		calle: req.body.calle,
				colonia: req.body.colonia,
				numero: req.body.numero,
				cp: req.body.cp
		  	},
		  	geolocalizacion:{
			  	lat: req.body.lat,
			  	long: req.body.long,
			},
		  	imagenes:[],
		  	fecha: req.body.fecha,
 			fecha_modif: req.body.fecha_modif,
 			activo :  true	
    	});

    	asunto.save(function(err){
    		if(!err){
    			console.log("Asunto created");
    			return res.send({status:'OK', asunto:asunto})
    		}
    		else{
    			res.statusCode = 500;
  				console.log('Internal error(%d): %s',res.statusCode,err.message);
  				return res.send({ error: 'Error asunto' });
    		}
    	});

	};


 	updateAsunto= function(req, res){
 		console.log("PUT - /asunto/:id");
 		return Asunto.findById(req.params.id,function(err,asunto){
 			if (!asunto){
 				res.statusCode = 404;
        		return res.send({ error: 'Not found' });
 			}
 			asunto.descripcion = req.body.descripcion;
 			asunto.activo = req.body.activo;
 			return asunto.save(function(){
 				if(!err){
 					return res.send({status:'ok',asunto:asunto});
 				}
 				else{
 					res.statusCode = 500;
            		res.send({ error: 'Server error' });
 				}
 			});

 		});

	};

 	deleteAsunto = function(req, res){
 		console.log("DELETE - /asunto/:id");
 		return Asunto.findById(req.params.id,function(err,asunto){
 			if(!asunto){
 				res.statusCode = 404;
        		return res.send({ error: 'Not found' });
 			}
 			return asunto.remove(function(err){
 				if(!err){
 					return res.send({status:'ok'});
 				}
 				else{
 					res.statusCode = 500;
            		res.send({ error: 'Server error' });
 				}
 			});

 		});
	};


  app.get('/asuntos', findAllAsuntos);
  app.get('/asunto/:id', findById);
  app.post('/asunto', addAsunto);
  app.put('/asunto/:id', updateAsunto);
  app.delete('/asunto/:id', deleteAsunto);

}