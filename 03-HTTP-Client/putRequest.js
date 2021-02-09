const https = require( 'https' );


const options = {
  host: 'jsonplaceholder.typicode.com',
	path: '/users/1',
  method: 'PUT',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  }
};
const requestData = {
  username: 'doejohn'
};

let request = https.request( options,  (res) => {
  if (res.statusCode !== 200) {
    console.error(` Did not get an OK from the server.. Code: ${res.statusCode}`);
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

