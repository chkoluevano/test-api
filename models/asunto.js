var mongoose = require('mongoose');
Schema = mongoose.Schema


var Asunto = new Schema({
  descripcion:  String,
  //asunto_id : {type: Number, unique: true },
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
