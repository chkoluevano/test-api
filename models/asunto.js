var mongoose = require('mongoose');
Schema = mongoose.Schema

/* Model relationship */
var Origen = require('../models/origen.js');


var Asunto = new Schema({
  _origen : { type: Schema.Types.ObjectId, ref: 'Origen' },
  descripcion:  String,
  folio: String,
  direccion_reporte: {
  	calle: String,
  	colonia: String,
  	numero: String,
  	cp: Number
  },
  
  geolocalizacion:{
  	lat: String,
  	long: String
  },
  origen: String,
  respuestas:[{
  	resp_respuesta: String,
  	resp_fecha: Date,
  	resp_activo: Boolean
  }],

  imagenes:[{
  	img_path: String,
  	img_fecha: Date,
  	img_activo: Boolean
  }],

  status : {
    status_nombre : { type: String, default: "iniciado" },
    status_fecha_modif : {type :Date, default: Date.now },
  },

  fecha:  { type: Date, default: Date.now },
  fecha_modif: {type :Date, default: Date.now },
  activo: { type: Boolean, default: true }    
});


module.exports = mongoose.model('Asunto', Asunto);
