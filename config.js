var config = {
  production: {
    database: 'mongodb://chko:chkochko@ds023475.mlab.com:23475/atencion_ciudadana_mongo'
  },
  default: {
  database: 'mongodb://chko:chkochko@ds023475.mlab.com:23475/atencion_ciudadana_mongo'
   
 }
}

exports.get = function get(env) {
  return config[env] || config.default;
}
