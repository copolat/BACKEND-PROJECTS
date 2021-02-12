const request = require('request');
require('dotenv').config();
const http = require('http');

let apiKey=process.env.apiKey;
const city = 'Mexico City';

const form = `<form action='/' method='post'>
<input type="text" name='city'/> 
<button type='submit'>Submit</button>  
</form> `
const myServer = http.createServer((req, res)=>{
  res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
  res.write(form);
  let body = "";
  req.on('data', function (chunk) {  //takes input value from DOM
  body += chunk;
  console.log(body);
  let getCity = body.split('=')[1];
  console.log(getCity);

  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${getCity}`;
  request(url, function(err, response, body) {
    if (err) {
      console.log('error:', err);
    } else {
      let data = JSON.parse(body);
      console.log('body:', `<h1> Today temprature is ${data.current.temperature} in ${data.location.name}</h1>`);
      res.end( `<h1> Today temprature is ${data.current.temperature} in ${data.location.name}</h1>`);
    }
  });
});
});

myServer.listen(3000)