var axios = require('axios');

var makeRequest = async function() {

  axios.get('http://localhost:3000/api/customers')

  var res = await axios.get('http://localhost:3000/api/customers');
  console.log(res);

}

var res = makeRequest();
console.log(res);
