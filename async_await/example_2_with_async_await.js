var axios = require('axios');

var makeRequest = async function() {


  try {

      var res = await axios.get('http://www.google.com');
      // console.log(res);
      // return res;
      var res_v = await axios.get('http://www.facebook.com');
      // console.log(res_v);

      return 'termino de ejecutarse';

  } catch(err){
      console.log(err);
  }




}

var res = makeRequest();
// console.log(res);
res.then(function(res_x){
    console.log(res_x);
});
