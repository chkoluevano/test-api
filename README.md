 findAllNombreModelo
 findById
 addNombreModelo
 updateNombreModelo
 deleteNombreModelo



app.get('/nombremodelo', findAllNombreModelo);
app.get('/nombremodelo/:id', findById);
app.post('/nombremodelo', addNombreModelo);
app.put('/nombremodelo/:id', updateNombreModelo);
app.delete('/nombremodelo/:id', deleteNombreModelo);


{
  _id: '1',
  folio : "12345",
  evento_id:1,
  usuario_id:1,
  ciudadano_id:1,
  peticion_id:1,
  fecha_alta: '2016/10/10',
  fecha_modif: '2016/10/10',
  descripcion: 'descripcion',
  activo:true,
  status : {
    nombre : "iniciado",
    fecha_modif : "2016/10/10",
    usuario_id : 1
  }
  direccion_reporte :  {
              calle: "123 Fake Street",
              colonia: "MA",
              numero: "MA",
              cp: "12345"
            },
  geolocalizacion:{
              lat: "12121212",
              long: "324234234432"
  },
  respuestas: [
               {
                 respuesta: "respuesta 1",
                 fecha: "2016/10/10",
                 usuario_id: 1,
                 activo: true
               },
               {
                 respuesta: "respuesta 2",
                 fecha: "2016/10/10",
                 usuario_id: 1,
                 activo: true
               }
             ],
  imagenes:[
              {
                nombre: "/hola.jpg",
                fecha: "2016/10/10",
                activo: true
              },
              {
                nombre: "/hola2.jpg",
                fecha: "2016/10/10",
                activo: true
              }
              ]

}
