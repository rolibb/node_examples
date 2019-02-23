'use strict';

module.exports = function(Carrera) {

    Carrera.hello = function(ms, cb){
        //implementar funcionalidad aqui
        var res = 'hello '+ms;

      cb(null, res);
    };

  Carrera.remoteMethod('hello',
  {
      description: "esto saludo",
      http: {"verb": "post"},
      accepts: { arg:'ms', type:'string' },
      returns: { arg: 'saludo', type:'string' }
  });

};
