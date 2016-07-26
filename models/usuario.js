var mongoose = require('mongoose');
Schema = mongoose.Schema

var Usuario = new Schema({
  nombre:  String,
  clave:  String,
  username:  String,
  cargo:  String,
  email:  String,
  observaciones:  String,
  fecha:  { type: Date, default: Date.now },
  activo: { type: Boolean, default: true }    
});

module.exports = mongoose.model('Usuario', Usuario);
