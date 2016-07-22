var mongoose = require('mongoose');
Schema = mongoose.Schema


var Asunto = new Schema({
  descripcion:  String,
  fecha:  { type: Date, default: Date.now },
  activo: { type: Boolean, default: true }    
});


module.exports = mongoose.model('Asunto', Asunto);
