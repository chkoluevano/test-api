var mongoose = require('mongoose');
Schema = mongoose.Schema

/* Usuarios Internos del sistema */

var Usuario = new Schema({
  nombre:  String,
  apellido:  String,
  clave:  String, /* Default */
  username:  String, /* Username */
  cargo:  String, 
  email:  String,
  observaciones:  String,
  fecha:  { type: Date, default: Date.now },
  activo: { type: Boolean, default: true },
  permisos: [{ nombre: String }],
  departamento:{
  	/* Referencia al documento */
  	area : Number
  }

});

module.exports = mongoose.model('Usuario', Usuario);
