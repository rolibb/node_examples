'use strict';

module.exports = function(Customer) {
    Customer.hello = function(ms, cb){
      cb(null, 'hello '+ms);
  };

  Customer.remoteMethod('hello',
  {
      accepts: { arg:'ms', type:'string' },
      returns: { arg: 'saludo', type:'string' }
  });

};
