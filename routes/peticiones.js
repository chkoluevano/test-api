module.exports = function(app) {

    var Peticion = require('../models/peticion.js');

    findAllPeticiones = function(req, res) {
        console.log('GET - /origen');
        return Peticion.find(function(err, peticion) {
            if (!err) {
                res.send(peticion)
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Error peticion' });

            }

        });
    };


    addPeticion = function(req, res) {
        console.log('POST - /origen');

        var peticion = new Peticion({
            nombre: req.body.nombre,
            dias: req.body.dias
        });

        peticion.save(function(err) {
            if (!err) {
                console.log("peticion created");
                return res.send({ status: 'OK', peticion: peticion })
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Error peticion' });
            }
        });

    };






    app.get('/peticiones', findAllPeticiones);
    app.post('/peticion', addPeticion);

}
