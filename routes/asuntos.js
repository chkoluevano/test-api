var multer  =   require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage : storage}).single('userPhoto');



module.exports=function(app){
	var Asunto = require('../models/asunto.js');
	var Peticion = require('../models/peticion.js');

	/* Metodo para la APP */
	photosUpload = function(req, res){
    	upload(req,res,function(err) {
        	if(err) {
            	return res.end(err.message);
        	}
        		res.statusCode = 500;
  				console.log('Internal error(%d): %s',res.statusCode,err.message);
  				return res.send({ error: 'Error asunto' });
    	});
	};
	

	// All Routes functions
	findAllAsuntos = function(req, res){
		console.log('GET - /asuntos');
		 return Asunto.find(function(err, asuntos) {
		 	Peticion.populate(asuntos, {path: "_peticion"},function(err, asuntos){
        		    if (!err){
        		    	console.log(asuntos);
                		res.status(200).send(asuntos);
            		}
            		else{
            			res.statusCode = 500;
  						console.log('Internal error(%d): %s',res.statusCode,err.message);
  						return res.send({ error: 'Error asunto' });
  					}
        		    
        		}); 
        });
	};

	findById = function(req, res){
		console.log('GET - /asuntos/:id');
			// Busca por folio
			return Asunto.findById(req.params.id, function(err, asuntos){
				Peticion.populate(asuntos, {path: "_peticion"},function(err, asuntos){
					if (!asuntos){
						res.statusCode = 404;
						return res.send({ error: 'Not found' });
					}
					if (!err){
						return res.send({ status: 'OK', asunto:asuntos});
					}
					else{
						res.statusCode = 500;
		  				console.log('Internal error(%d): %s',res.statusCode,err.message);
		  				return res.send({ error: 'Error asunto' });
					}
				});
		});


	};

 	addAsunto = function(req, res){
 		console.log('POST - /asunto');

 		/*
 		*/ 
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
			  	long: req.body.long
			},
			origen : req.body.origen,
		  	imagenes:[],
		  	fecha: req.body.fecha,
 			fecha_modif: req.body.fecha_modif,
 			activo :  true,
 			_peticion : req.body.peticion
    	});

    	asunto.save(function(err){
    		if(!err){
    			console.log("Asunto created");
    			return res.send({status:'OK', asunto:asunto})
    		}
    		else{
    			res.statusCode = 500;
  				console.log('Internal error(%d): %s',res.statusCode,err.message);
  				console.log(err.message)
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
 			asunto.origen = req.body.origen;
 			asunto.descripcion = req.body.descripcion;
			asunto.direccion_reporte.cp = req.body.cp;
			asunto.direccion_reporte.calle = req.body.calle;
			asunto.direccion_reporte.colonia = req.body.colonia;
			asunto.direccion_reporte.numero = req.body.numero;
			asunto.status.status_nombre = req.body.status_nombre;
			asunto._peticion= req.body.peticion;
			if (!err) {
	 			return asunto.save(function(err){
	 				if(!err){
	 					return res.send({status:'ok',asunto:asunto});
	 				}
	 				else{
	 					res.statusCode = 500;
	            		res.send({ error: 'Server error' });
	 				}
	 			});
	 		}

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

	/* Custom search
	ByStatus
	 */

	findByStatus = function (req, res){
		console.log('GET - /asunto/status/:status')
		return Asunto.find({'status.status_nombre': req.params.nombre }, function (err, asuntos) {
			Peticion.populate(asuntos, {path: "_peticion"},function(err, asuntos){
	  			if (!asuntos){
					res.statusCode = 404;
					return res.send({ error: 'Not found' });
				}
	  			if (!err) {
	  				return res.send({ status: 'OK', asunto:asuntos });
	  			}
	  			else{
	  				res.statusCode = 500;
	  				res.send({ error: 'Server error' });
	  			}
	  		});
		});
	};






	/* Custom search
	ByToday
	 */

	findByToday = function (req, res){
		console.log('GET - /asuntos/today/')
		/* Today */
		var today = new Date();
		today.setHours(0,1,0,0);
		today.setDate(today.getDate());
		/* Today at Midnigth */
		var todayAtMidnigth = new Date();
		todayAtMidnigth.setHours(22,0,0,0);
		todayAtMidnigth.setDate(todayAtMidnigth.getDate());

		return Asunto.find({'fecha': {$gt: today, "$lt": todayAtMidnigth}}, function (err, asuntos) {
			Peticion.populate(asuntos, {path: "_peticion"},function(err, asuntos){
				if (!asuntos){
					res.statusCode = 404;
					return res.send({ error: 'Not found' });
				}
				if (!err) {
					return res.send({ status: 'OK', asunto:asuntos });
				}
				else{
					res.statusCode = 500;
					res.send({ error: 'Server error' });}
				});
		});
	};


	 findTest = function(req, res){
		Asunto.aggregate([
        {
            $group: {
               	_id: '$_peticion',
                count: {$sum: 1},
                 "records":{$push:"$$ROOT"},
				//totalPrice: { $sum:  "$peticion.dias" }

            }
        }
	    ], function (err, result) {
	        if (err) {
	            next(err);
	        } else {
	            res.json(result);
	        }
	    });
	}





  /* A P P */
  app.post('/photosUpload/:asunto', photosUpload);



  /* Basicas */
  /*  A D M I N I S T R A D O R */
  // _________________________________________
  app.get('/asuntos', findAllAsuntos);
  app.get('/asuntos/today/', findByToday);
  app.get('/asunto/:id', findById);
  app.post('/asunto', addAsunto);
  app.put('/asunto/:id', updateAsunto);
  app.delete('/asunto/:id', deleteAsunto);
  app.get('/asuntos/status/:nombre', findByStatus);
  app.get('/asuntos/test', findTest);


  /* D E P E N D E N C I A S */
  // _________________________________________
  // FindAsuntosByDireccionToday
  // FindAllAsuntosByDireccion
  // Responder
  // UpdateStatus

  

  /* * * * * * * * * * * * /
  /* * * * * * * * * * * * /
  /* * * * * * * * * * * * /
  /* * * * * * * * * * * * /
  /* * * * * * * * * * * * /
  /* * * * * * * * * * * * /


  /* Routes Reportes */

  /* A D M I N I S T R A D O R */
  // _________________________________________
  // Find By Date Range
  // Find By Ciudadano : populate + find
  // Find By Origen
  // Find By Peticion
  // Find By Folio
  // Find By Direccion

  /* D E P E N D E N C I A S */
  // _________________________________________






}