var mongoose = require('mongoose');
var config = require('../config.js').get(process.env.NODE_ENV);

module.exports = function(callback) {
	console.log(config.database)
    mongoose.connect(config.database, function(err, res) {
        if (!err) {
            console.log(" *** CONECTADO ***")
        } else {
            console.log("ERROR: " + err);
        }
    });


}
