const https = require( 'https' );


const options = {
  host: 'jsonplaceholder.typicode.com',
  path: '/users',
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  }
};
const requestData = { 
  name: 'Juan Manuel Martínez',
  username: 'Juanito',
  email: 'JuanMM2@chulada.tv',
  address: {
    street: 'Toronto',
    suite: 'Suite 12',
    city: 'Tequexquinahuac',
    zipcode: '54020',
    geo: [Object]
  },
  phone: '55-5623-9954 ',
  website: 'chulada.org',
  company: {
    name: 'Chulada SA de SV',
    catchPhrase: 'As nice as chulada',
    bs: 'synergize scalable supply-chains'
  }
}
let request = https.request( options,  (res) => {
  if (res.statusCode !== 201) {
    console.error(` The request has been fulfilled and has resulted. Code: ${res.statusCode}`);
    res.resume();
    return;
  };
  let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('close', () => {
      console.log('Retrieved all data');
      console.log(JSON.parse(data));
    });
  });  
  request.write(JSON.stringify(requestData));
  request.end(`{"message": "This is a JSON response"}`);
  request.on('error', (err) => {
    console.error(`Encountered an error trying to make a request: ${err.message}`);
  });

