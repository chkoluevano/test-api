var mongoose = require('mongoose');
Schema = mongoose.Schema

var Peticion = new Schema({
  nombre:  String,
  dias: Number,
  activo: Boolean
});

module.exports = mongoose.model('Peticion', Peticion);
