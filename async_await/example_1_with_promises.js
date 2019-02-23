var axios = require('axios');

var makeRequest = function() {

  return axios.get('http://www.google.comx')
  // .then(function(res){
  //     console.log(res.data);
  // })
  // .catch(function(err){
  //     console.log(err);
  // });

  // axios.get(url, function(err, res){
  //    if (err) {
  //        console.log(errr)
  //    }
  //    console.log(res);
  // });
}

makeRequest().then(function(result){
    console.log(result);
}).catch((err) => { console.log(err) });
