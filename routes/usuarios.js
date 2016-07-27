/* Namespaces */
var userLib = require('../libs/usuarios');


module.exports = function(app) {
    var Usuario = require('../models/usuario.js');
    findAllUsuarios = function(req, res) {
        console.log('GET - /usuario');
        console.log(userLib);
        return Usuario.find(function(err, usuario) {
            if (!err) {
                res.send(usuario)
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Error usuario' });

            }

        });
    };


    addUsuario = function(req, res) {
        console.log('POST - /usuario');

        var usuario = new Usuario({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            cargo: req.body.cargo,
            username : userLib.username(),
            clave : userLib.password(),
            email: req.body.email,
            observaciones: req.body.observaciones,
            permisos:
            [
                {nombre: req.body.permiso_uno},
                {nombre: req.body.permiso_dos}
            ],
            departamento:{
                    area : 1
            }
            
        });

        usuario.save(function(err) {
            if (!err) {
                console.log("peticion created");
                return res.send({ status: 'OK', usuario: usuario })
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Error usuario' });
            }
        });

    };

    




    app.get('/usuarios', findAllUsuarios);
    app.post('/usuario', addUsuario);

}
