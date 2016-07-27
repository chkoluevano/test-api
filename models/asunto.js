var mongoose = require('mongoose');
Schema = mongoose.Schema

/* Model relationship */
var Peticion = require('../models/peticion.js');
//var Usuario = require('../models/usuario.js');


var Asunto = new Schema({
    //_usuario : { type: Schema.Types.ObjectId, ref: 'Usuario' },
    _peticion: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    descripcion: String,
    folio: { type: Number, default: 1 }, 
    direccion_reporte: {
        calle: String,
        colonia: String,
        numero: String,
        cp: Number
    },

    geolocalizacion: {
        lat: String,
        long: String
    },
    origen: String,
    respuestas: [{
        respuesta: String,
        resp_fecha: Date,
        resp_activo: Boolean
            //_usuario : { type: Schema.Types.ObjectId, ref: 'Usuario' },

    }],

    imagenes: [{
        img_path: String,
        img_fecha: Date,
        img_activo: Boolean
    }],

    status: {
        status_nombre: { type: String, default: "iniciado" },
        status_fecha_modif: { type: Date, default: Date.now },
    },
    origen: { type: String },
    fecha: { type: Date, default: Date.now },
    fecha_modif: { type: Date, default: Date.now },
    activo: { type: Boolean, default: true }
});


module.exports = mongoose.model('Asunto', Asunto);
