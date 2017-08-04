var axios = require('axios');

var makeRequest = function() {

  axios.get('http://localhost:3000/api/customers')
  .then(function(res){
      console.log(res.data);
  })
  .catch(function(err){
      console.log(err);
  });
}

makeRequest().then(function(result){
    console.log(result);
});
