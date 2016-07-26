var mongoose = require('mongoose');

module.exports = function(callback) {
    //'mongodb://localhost:27017/mono-testing',function(err, res){
    mongoose.connect('mongodb://usrpruebas:pwdatencion@ds023475.mlab.com:23475/atencion_ciudadana_mongo', function(err, res) {
        if (!err) {
            console.log(" *** CONECTADO ***")
        } else {
            console.log("ERROR: " + err);
        }
    });


}
